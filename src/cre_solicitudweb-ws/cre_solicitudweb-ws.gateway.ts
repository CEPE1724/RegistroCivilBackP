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
  const clientIp = client.handshake.address;
  const userAgent = client.handshake.headers['user-agent'];
  
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

    // Almacenar información adicional del cliente
    client.data.idUsuario = payload.idUsuario;
    client.data.idGrupo = payload.idGrupo;
    client.data.Nombre = payload.Nombre;
    client.data.clientIp = clientIp;
    client.data.userAgent = userAgent;
    client.data.connectedAt = new Date();

    // Registrar cliente - esto automáticamente desconectará sesiones anteriores
    await this.creSolicitudwebWsService.registerClient(
      client,
      payload.idUsuario
    );

    console.log(`✅ Socket conectado: ${client.id} | Usuario: ${payload.Nombre} (ID: ${payload.idUsuario}) | IP: ${clientIp}`);
    
    // Enviar confirmación de conexión exitosa
    client.emit('connection-established', {
      message: 'Conexión establecida exitosamente',
      userId: payload.idUsuario,
      userName: payload.Nombre,
      connectedAt: new Date().toISOString(),
      sessionId: client.id
    });

  } catch (e) {
    console.log(`❌ Socket rechazado: ${client.id} | Error: ${e.message} | IP: ${clientIp}`);
    
    // Enviar razón del rechazo antes de desconectar
    client.emit('connection-rejected', {
      reason: e.message,
      message: 'Conexión rechazada: Token inválido o expirado',
      timestamp: new Date().toISOString()
    });
    
    setTimeout(() => {
      client.disconnect(true);
    }, 500);
  }
}



  

  
  handleDisconnect(client: Socket) {
    const userName = client.data?.Nombre || 'Unknown';
    const userId = client.data?.idUsuario || 'Unknown';
    
    console.log(`🔌 Cliente desconectado: ${client.id} | Usuario: ${userName} (ID: ${userId})`);
    
    this.creSolicitudwebWsService.removeClient(client.id);
    
    // Opcional: Notificar a otros clientes sobre la desconexión
    // this.wss.emit('user-disconnected', { userId, userName, timestamp: new Date().toISOString() });
  }

  @SubscribeMessage('message-from-client')
  onMessage(client: Socket, payload: NewCreSolicitudwebDto) {
    console.log('Message from client:', payload, client.id);
    this.wss.emit('message-from-server', {
      fullName: 'Server',
      message: payload.message || 'No message',
    });
  }

  // Método para obtener usuarios conectados (para administradores)
  @SubscribeMessage('get-connected-users')
  onGetConnectedUsers(client: Socket) {
    // Verificar permisos de administrador si es necesario
    if (client.data.idGrupo === 36) {
      client.emit('access-denied', { message: 'No autorizado para esta acción' });
      return;
    }
    
    const connectedUsers = this.creSolicitudwebWsService.getConnectedUsersInfo();
    client.emit('connected-users-list', {
      users: connectedUsers,
      count: connectedUsers.length,
      timestamp: new Date().toISOString()
    });
  }

  // Método para forzar desconexión de un usuario (para administradores)
  @SubscribeMessage('force-disconnect-user')
  onForceDisconnectUser(client: Socket, payload: { userId: number, reason?: string }) {
    // Verificar permisos de administrador
    if (client.data.idGrupo === 36) {
      client.emit('access-denied', { message: 'No autorizado para esta acción' });
      return;
    }
    
    const success = this.creSolicitudwebWsService.disconnectUser(
      payload.userId, 
      payload.reason || 'Desconexión forzada por administrador'
    );
    
    client.emit('force-disconnect-result', {
      success,
      userId: payload.userId,
      timestamp: new Date().toISOString()
    });
  }

  // Método para verificar el estado de la sesión actual
  @SubscribeMessage('check-session-status')
  onCheckSessionStatus(client: Socket) {
    client.emit('session-status', {
      userId: client.data.idUsuario,
      userName: client.data.Nombre,
      sessionId: client.id,
      connectedAt: client.data.connectedAt,
      isActive: true,
      timestamp: new Date().toISOString()
    });
  }
}

