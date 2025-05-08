import { Module } from '@nestjs/common';
import { CreSolicitudwebWsService } from './cre_solicitudweb-ws.service';
import { CreSolicitudwebWsGateway } from './cre_solicitudweb-ws.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CreSolicitudwebWsGateway, CreSolicitudwebWsService],
  imports: [AuthModule],
  exports: [CreSolicitudwebWsGateway , CreSolicitudwebWsService], 
})
export class CreSolicitudwebWsModule {}
