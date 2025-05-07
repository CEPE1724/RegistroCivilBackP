import { Module } from '@nestjs/common';
import { CreSolicitudWebService } from './cre_solicitud-web.service';
import { CreSolicitudWebController } from './cre_solicitud-web.controller';
import { CreSolicitudWeb } from './entities/cre_solicitud-web.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModuleCogno } from 'src/cognosolicitudcredito/auth/auth.module';
import {EqfxidentificacionconsultadaModule} from 'src/eqfxidentificacionconsultada/eqfxidentificacionconsultada.module';
import { CreSolicitudwebWsService } from "../cre_solicitudweb-ws/cre_solicitudweb-ws.service";
import { CreSolicitudwebWsGateway } from "../cre_solicitudweb-ws/cre_solicitudweb-ws.gateway";
import { CreSolicitudwebWsModule } from "../cre_solicitudweb-ws/cre_solicitudweb-ws.module";
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [CreSolicitudWebController],
  providers: [CreSolicitudWebService], // ✅ Solo el servicio
  imports: [
    TypeOrmModule.forFeature([CreSolicitudWeb]),
    AuthModuleCogno,
    EqfxidentificacionconsultadaModule,
    CreSolicitudwebWsModule, // ✅ Este módulo ya provee el Gateway
    AuthModule,
  ],
})
export class CreSolicitudWebModule {}
