import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CreSolicitudwebWsService } from './cre_solicitudweb-ws.service';
import { Socket, Server } from 'socket.io';
import { NewCreSolicitudwebDto } from './dto/new-cre_solicitudweb.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

@WebSocketGateway({
  cors: { origin: '*', credentials: false },
  transports: ['polling', 'websocket'],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000,
})

export class CreSolicitudwebWsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;
  
  constructor(
    private readonly creSolicitudwebWsService: CreSolicitudwebWsService,
    private readonly jwtService: JwtService,
  ) { }

  async afterInit(server: Server) {
    // ✅ Configurar Redis Adapter para Socket.IO
    const pubClient = createClient({
      socket: {
        host: '192.168.1.88',
        port: 6379,
      },
      password: 'Credito2024!Secure',
    });

    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    server.adapter(createAdapter(pubClient, subClient));

    console.log('✅ Socket.IO Redis Adapter configurado correctamente');
  }

 async handleConnection(client: Socket) {
  const token =
    (client.handshake.auth?.token as string) ||
    (client.handshake.headers?.authorization as string)?.replace(/^Bearer\s+/i, "");

  if (!token) {
    console.log("❌ No authentication token provided");
    client.disconnect(true);
    return;
  }

  try {
    const payload = this.jwtService.verify<JwtPayload>(token);

    client.data.idUsuario = payload.idUsuario;
    client.data.idGrupo = payload.idGrupo;
    client.data.Nombre = payload.Nombre;

    await this.creSolicitudwebWsService.registerClient(client, payload.idUsuario);

    // ✅ Unir al cliente a una room específica de su usuario
    await client.join(`user:${payload.idUsuario}`);
    console.log(`✅ Usuario ${payload.Nombre} unido a room: user:${payload.idUsuario}`);

    console.log("✅ Client connected:", payload.Nombre);
    console.log("Client ID:", client.id);
  } catch (error: any) {
    console.log("❌ Authentication failed:", error?.message);
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

