import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CreSolicitudwebWsService } from './cre_solicitudweb-ws.service';
import { Socket, Server } from 'socket.io';
import { NewCreSolicitudwebDto } from './dto/new-cre_solicitudweb.dto';

@WebSocketGateway({ cors: true })
export class CreSolicitudwebWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;
  constructor(
    private readonly creSolicitudwebWsService: CreSolicitudwebWsService
  ) { }

  handleConnection(client: Socket) {
    //console.log('Client connected:', client.id);
    this.creSolicitudwebWsService.registerClient(client);

    this.wss.emit('clients-updated', this.creSolicitudwebWsService.getConnectedClients());
  }
  handleDisconnect(client: Socket) {
    // console.log('Client disconnected:', client.id);
    this.creSolicitudwebWsService.removeClient(client.id);
    this.wss.emit('clients-updated', this.creSolicitudwebWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  onMessage(client: Socket, payload: NewCreSolicitudwebDto) {
    console.log('Message from client:', payload, client.id);
  }
}
