import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Usuario } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


interface ConnectedClients {
    [id: string]: 
    {
        socekt: Socket,
        user: Usuario
    }
}

@Injectable()
export class CreSolicitudwebWsService {

    private connectedClients: ConnectedClients ={}

    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository: Repository<Usuario>
    ) { }

    async registerClient(client: Socket, userId: number) {
        const user = await this.userRepository.findOne({ where: { idUsuario: userId } });
        if (!user) throw new Error('User not found');
        if(!user.Activo) throw new Error('User is inactive');
        if(user.idGrupo == 36) throw new Error('User is not authorized');
        this.checkUserConnection(user);
        this.connectedClients[client.id] = 
        {
            socekt: client,
            user: user
        };
        console.log('Client registered:', client.id);

    }

    removeClient(clientId: string) {
       delete this.connectedClients[clientId];
         console.log('Client removed:', clientId);
    }


    getSocketByUserId(idUsuario: number): Socket | null {
        const client = Object.values(this.connectedClients).find(client => client.user.idUsuario === idUsuario);
        return client ? client.socekt : null;
      }

    getSocketByNombre(nombre: string): Socket | undefined {
        for (const client of Object.values(this.connectedClients)) {
            if (client.user.Nombre === nombre) {
                return client.socekt; 
            }
        }
        return undefined;
    }
    
      
      
    getConnectedClients(): string[] {
        return Object.keys(this.connectedClients);

    }

    getUserFullName(socketId: string): string {
        return this.connectedClients[socketId]?.user.Nombre || 'Unknown User';
    }

    private checkUserConnection(user: Usuario): void {
        // Buscar todas las conexiones existentes del usuario
        const existingConnections = Object.entries(this.connectedClients)
            .filter(([clientId, client]) => client.user.idUsuario === user.idUsuario);

        if (existingConnections.length > 0) {
            console.log(`🔄 Usuario ${user.Nombre} (ID: ${user.idUsuario}) ya conectado en ${existingConnections.length} sesión(es). Desconectando sesiones anteriores...`);
            
            // Desconectar todas las sesiones existentes
            existingConnections.forEach(([clientId, client]) => {
                console.log(`❌ Desconectando sesión anterior: ${clientId}`);
                
                // Notificar al cliente que será desconectado por sesión duplicada
                client.socekt.emit('session-terminated', {
                    reason: 'duplicate_session',
                    message: 'Tu sesión ha sido cerrada porque iniciaste sesión en otro dispositivo',
                    timestamp: new Date().toISOString()
                });
                
                // Desconectar después de un pequeño delay para asegurar que el mensaje se envíe
                setTimeout(() => {
                    client.socekt.disconnect(true);
                    // Limpiar de la lista de conectados
                    delete this.connectedClients[clientId];
                }, 500);
            });
        }
    }

    // Método para obtener información detallada de usuarios conectados
    getConnectedUsersInfo(): any[] {
        return Object.entries(this.connectedClients).map(([socketId, client]) => ({
            socketId,
            userId: client.user.idUsuario,
            userName: client.user.Nombre,
            userGroup: client.user.idGrupo,
            isActive: client.user.Activo
        }));
    }

    // Método para forzar desconexión de un usuario específico (para administradores)
    disconnectUser(userId: number, reason: string = 'admin_disconnect'): boolean {
        const client = Object.values(this.connectedClients)
            .find(client => client.user.idUsuario === userId);
        
        if (client) {
            console.log(`🔧 Admin desconectando usuario ${client.user.Nombre} (ID: ${userId})`);
            
            client.socekt.emit('session-terminated', {
                reason,
                message: 'Tu sesión ha sido cerrada por un administrador',
                timestamp: new Date().toISOString()
            });
            
            setTimeout(() => {
                client.socekt.disconnect(true);
            }, 500);
            
            return true;
        }
        
        return false;
    }
}
