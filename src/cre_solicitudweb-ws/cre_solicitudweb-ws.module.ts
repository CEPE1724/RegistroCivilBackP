import { Module } from '@nestjs/common';
import { CreSolicitudwebWsService } from './cre_solicitudweb-ws.service';
import { CreSolicitudwebWsGateway } from './cre_solicitudweb-ws.gateway';

@Module({
  providers: [CreSolicitudwebWsGateway, CreSolicitudwebWsService],
})
export class CreSolicitudwebWsModule {}
