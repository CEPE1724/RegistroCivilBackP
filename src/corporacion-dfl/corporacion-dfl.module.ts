import { Module } from '@nestjs/common';
import { CorporacionDflService } from './corporacion-dfl.service';
import { CorporacionDflController } from './corporacion-dfl.controller';
import { Tokensia365 } from '../tokensia365/entities/tokensia365.entity';
import { Tokensia365Service } from '../tokensia365/tokensia365.service';
import { Analisisdeidentidad } from '../analisisdeidentidad/entities/analisisdeidentidad.entity';
import { AnalisisdeidentidadService } from '../analisisdeidentidad/analisisdeidentidad.service';
import { DflAnalisisBiometrico } from '../dfl_analisis-biometrico/entities/dfl_analisis-biometrico.entity';
import { DflIndicadoresAnverso } from 'src/dfl_indicadores-anverso/entities/dfl_indicadores-anverso.entity';
import { DflIndicadoresReverso } from 'src/dfl_indicadores-reverso/entities/dfl_indicadores-reverso.entity';
import { DflMetadataProcesada } from 'src/dfl_metadata-procesada/entities/dfl_metadata-procesada.entity';
import { DflReferencia } from 'src/dfl_referencia/entities/dfl_referencia.entity';
import { DflResultado } from 'src/dfl_resultado/entities/dfl_resultado.entity';

import { StoreReportsPhoneVerificationModule } from '../store-reports-phone-verification/store-reports-phone-verification.module'; // ✅ importa el módulo, no el servicio
import { StoreReportsPhoneVerificationService } from '../store-reports-phone-verification/store-reports-phone-verification.service';

import { DflAnalisisBiometricoService } from 'src/dfl_analisis-biometrico/dfl_analisis-biometrico.service';
import { DflIndicadoresAnversoService } from 'src/dfl_indicadores-anverso/dfl_indicadores-anverso.service';
import { DflIndicadoresReversoService } from 'src/dfl_indicadores-reverso/dfl_indicadores-reverso.service';
import { DflMetadataProcesadaService } from 'src/dfl_metadata-procesada/dfl_metadata-procesada.service';
import { DflReferenciaService } from 'src/dfl_referencia/dfl_referencia.service';
import { DflResultadoService } from 'src/dfl_resultado/dfl_resultado.service';
import { DflStoregoogleService } from 'src/dfl_storegoogle/dfl_storegoogle.service';
import { WebSolicitudgrandeService } from 'src/web_solicitudgrande/web_solicitudgrande.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreSolicitudWebModule } from 'src/cre_solicitud-web/cre_solicitud-web.module';
import { TiemposolicitudeswebService } from 'src/tiemposolicitudesweb/tiemposolicitudesweb.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tokensia365,
      Analisisdeidentidad,
      DflAnalisisBiometrico,
      DflIndicadoresAnverso,
      DflIndicadoresReverso,
      DflMetadataProcesada,
      DflReferencia,
      DflResultado,
    ]),
    StoreReportsPhoneVerificationModule,
    CreSolicitudWebModule,
  ],
  controllers: [CorporacionDflController],
  providers: [
    CorporacionDflService,
    Tokensia365Service,
    AnalisisdeidentidadService,
    DflAnalisisBiometricoService,
    DflIndicadoresAnversoService,
    DflIndicadoresReversoService,
    DflMetadataProcesadaService,
    DflReferenciaService,
    DflResultadoService,
    DflStoregoogleService,
    WebSolicitudgrandeService,
    TiemposolicitudeswebService

  ],
  exports: [Tokensia365Service, AnalisisdeidentidadService],
})
export class CorporacionDflModule { }

