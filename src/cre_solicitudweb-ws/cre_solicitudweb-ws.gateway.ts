import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CreSolicitudwebWsService } from './cre_solicitudweb-ws.service';
import { Socket, Server } from 'socket.io';
import { NewCreSolicitudwebDto } from './dto/new-cre_solicitudweb.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';

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

    await this.creSolicitudwebWsService.registerClient(
      client,
      payload.idUsuario
    );

    console.log("✅ Socket conectado:", client.id, payload.idUsuario);

  } catch (e) {
    console.log("❌ Socket rechazado:", e.message);
    client.disconnect(true);
  }
}



  

  
  handleDisconnect(client: Socket) {
    // console.log('Client disconnected:', client.id);
    this.creSolicitudwebWsService.removeClient(client.id);
    ///this.wss.emit('clients-updated', this.creSolicitudwebWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  onMessage(client: Socket, payload: NewCreSolicitudwebDto) {
    console.log('Message from client:', payload, client.id);
    this.wss.emit('message-from-server', {
      fullName: 'Server',
      message: payload.message || 'No message',
    });

  }
}

