import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CreSolicitudwebWsService } from './cre_solicitudweb-ws.service';
import { Socket, Server } from 'socket.io';
import { NewCreSolicitudwebDto } from './dto/new-cre_solicitudweb.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';

@WebSocketGateway({ cors: true })
export class CreSolicitudwebWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;
  constructor(
    private readonly creSolicitudwebWsService: CreSolicitudwebWsService,
    private readonly jwtService: JwtService,
  ) { }

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

