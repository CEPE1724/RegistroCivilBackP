import { Module } from '@nestjs/common';
import { CreSolicitudWebService } from './cre_solicitud-web.service';
import { CreSolicitudWebController } from './cre_solicitud-web.controller';
import { CreSolicitudWeb } from './entities/cre_solicitud-web.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModuleCogno } from 'src/cognosolicitudcredito/auth/auth.module';
import {EqfxidentificacionconsultadaModule} from 'src/eqfxidentificacionconsultada/eqfxidentificacionconsultada.module';
@Module({
  controllers: [CreSolicitudWebController],
  providers: [CreSolicitudWebService],
   imports: [
    TypeOrmModule.forFeature([CreSolicitudWeb]),
    AuthModuleCogno,
    EqfxidentificacionconsultadaModule
   ]
})
export class CreSolicitudWebModule {}
