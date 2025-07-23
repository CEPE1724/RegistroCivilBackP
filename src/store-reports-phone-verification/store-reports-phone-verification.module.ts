import { Module } from '@nestjs/common';
import { StoreReportsPhoneVerificationService } from './store-reports-phone-verification.service';
import { StoreReportsPhoneVerificationController } from './store-reports-phone-verification.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { CreSolicitudWeb } from 'src/cre_solicitud-web/entities/cre_solicitud-web.entity';
import { WebSolicitudgrande } from 'src/web_solicitudgrande/entities/web_solicitudgrande.entity';
import { Cognotrabajocargo } from 'src/cognotrabajocargo/entities/cognotrabajocargo.entity';
import { CreVerificacionTelefonicaMaestro} from 'src/cre_verificacion-telefonica-maestro/entities/cre_verificacion-telefonica-maestro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cre_VerificacionTelefonica } from 'src/cre_verificacion-telefonica/entities/cre_verificacion-telefonica.entity';
import { CreSolicitudverificaciontelefonica } from 'src/cre-solicitudverificaciontelefonica/entities/cre-solicitudverificaciontelefonica.entity';
import { TiempoSolicitudesWeb } from 'src/tiemposolicitudesweb/entities/tiemposolicitudesweb.entity';
@Module({
  controllers: [StoreReportsPhoneVerificationController],
  providers: [StoreReportsPhoneVerificationService],
  imports: [
        TypeOrmModule.forFeature([CreSolicitudWeb, WebSolicitudgrande, Cognotrabajocargo, CreVerificacionTelefonicaMaestro,

          CreSolicitudverificaciontelefonica, TiempoSolicitudesWeb
        ]),
        PrinterModule
      ],
})
export class StoreReportsPhoneVerificationModule {}
