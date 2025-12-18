import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { CreSolicitudwebWsService } from './cre_solicitudweb-ws.service';
import { Socket, Server } from 'socket.io';
import { NewCreSolicitudwebDto } from './dto/new-cre_solicitudweb.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  path: '/socket.io',
  cors: {
    origin: '*',
    credentials: false,
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true,
})
export class CreSolicitudwebWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger('CreSolicitudwebWsGateway');

  @WebSocketServer() wss: Server;
  constructor(
    private readonly creSolicitudwebWsService: CreSolicitudwebWsService,
    private readonly jwtService: JwtService,
  ) { }
/*
 async handleConnection(client: Socket) {
  const token = client.handshake.auth?.token as string; // ✅ viene del front

  if (!token) {
    client.disconnect();
    return;
  }

  try {
    const payload = this.jwtService.verify<JwtPayload>(token);

    client.data.idUsuario = payload.idUsuario;
    client.data.idGrupo = payload.idGrupo;
    client.data.Nombre = payload.Nombre;

    await this.creSolicitudwebWsService.registerClient(client, payload.idUsuario);

    console.log("Client connected:", payload);
    console.log("Client ID:", client.id);
  } catch (error) {
    client.disconnect();
    return;
  }
}
*/
async handleConnection(client: Socket) {
  try {
    // 1️⃣ Obtener token desde auth (Socket.IO browser)
    let token = client.handshake.auth?.token as string;

    // 2️⃣ Si no viene por auth, intentar por header Authorization
    if (!token) {
      const authHeader = client.handshake.headers?.authorization as string;
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.slice(7);
      }
    }

    if (!token) {
      throw new Error("NO_TOKEN");
    }

    // 3️⃣ Verificar JWT
    const payload = this.jwtService.verify<JwtPayload>(token);

    client.data.idUsuario = payload.idUsuario;
    client.data.idGrupo = payload.idGrupo;
    client.data.Nombre = payload.Nombre;

    // 🏠 UNIR AUTOMÁTICAMENTE A ROOM DE USUARIO
    const roomName = `user:${payload.idUsuario}`;
    await client.join(roomName);
    this.logger.log(`👤 Usuario ${payload.idUsuario} unido a room: ${roomName}`);

    await this.creSolicitudwebWsService.registerClient(
      client,
      payload.idUsuario
    );

    // 📡 Confirmar conexión establecida
    client.emit('connection-established', {
      message: 'Conexión establecida exitosamente',
      userId: payload.idUsuario,
      userName: payload.Nombre,
      connectedAt: new Date(),
      sessionId: client.id,
      room: roomName
    });

    this.logger.log(`✅ Socket conectado: ${client.id} | Usuario: ${payload.idUsuario} | Room: ${roomName}`);

  } catch (e) {
    this.logger.error(`❌ Socket rechazado: ${e.message}`);
    client.disconnect(true);
  }
}



  

  
  handleDisconnect(client: Socket) {
    const idUsuario = client.data?.idUsuario;
    this.logger.log(`🔌 Cliente desconectado: ${client.id} | Usuario: ${idUsuario}`);
    this.creSolicitudwebWsService.removeClient(client.id);
  }

  @SubscribeMessage('message-from-client')
  onMessage(client: Socket, payload: NewCreSolicitudwebDto) {
    this.logger.log(`📨 Mensaje de cliente: ${client.id}`);
    this.wss.emit('message-from-server', {
      fullName: 'Server',
      message: payload.message || 'No message',
    });
  }

  /**
   * 🎯 MÉTODO PARA ENVÍO A USUARIO ESPECÍFICO
   * Envía evento solo al usuario especificado
   */
  sendToUser(idUsuario: number, event: string, data: any): boolean {
    try {
      const roomName = `user:${idUsuario}`;
      this.wss.to(roomName).emit(event, data);
      this.logger.log(`📡 Evento '${event}' enviado a usuario ${idUsuario} (room: ${roomName})`);
      return true;
    } catch (error) {
      this.logger.error(`❌ Error enviando evento a usuario ${idUsuario}: ${error.message}`);
      return false;
    }
  }

  /**
   * 📊 MÉTODO PARA OBTENER CLIENTES EN ROOM
   */
  getClientsInUserRoom(idUsuario: number): number {
    const roomName = `user:${idUsuario}`;
    const room = this.wss.sockets.adapter.rooms.get(roomName);
    return room ? room.size : 0;
  }
}

