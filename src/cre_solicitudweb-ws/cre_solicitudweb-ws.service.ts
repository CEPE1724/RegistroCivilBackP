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
      
    getConnectedClients(): string[] {
        return Object.keys(this.connectedClients);

    }

    getUserFullName(socketId: string): string {
        return this.connectedClients[socketId]?.user.Nombre || 'Unknown User';
    }

    private checkUserConnection( user: Usuario){
        for (const clientId of Object.keys(this.connectedClients)) {
            const connectedClient = this.connectedClients[clientId];
            if (connectedClient.user.idUsuario === user.idUsuario) {
                connectedClient.socekt.disconnect();
                break;
            }
        }
    }
}
