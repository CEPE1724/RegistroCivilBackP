import { Module } from '@nestjs/common';
import { EqfxReporteBuroCreditoService } from './eqfx-reporte-buro-credito.service';
import { EqfxReporteBuroCreditoController } from './eqfx-reporte-buro-credito.controller';
import { EqfxIndicadoresDeudaModule } from '../eqfx-indicadores-deuda/eqfx-indicadores-deuda.module';
import { EqfxIndicadoresDeudaHistoricaModule } from '../eqfx-indicadores-deuda-historica/eqfx-indicadores-deuda-historica.module';
import {EqfxResultadoSegmentacionModule} from '../eqfx-resultado-segmentacion/eqfx-resultado-segmentacion.module';
import {EqfxResultadoPoliticasModule} from '../eqfx-resultado-politicas/eqfx-resultado-politicas.module';
import {EqfxScorePuntajeV3Module} from '../eqfx-score-puntaje-v3/eqfx-score-puntaje-v3.module';
import {EqfxDetalleDeudaActModule} from '../eqfx-detalle-deuda-act/eqfx-detalle-deuda-act.module';
import {EqfxCalificaDetalleTarjModule} from '../eqfx-califica-detalle-tarj/eqfx-califica-detalle-tarj.module';
import {EqfxDetalleOperacionesVencModule} from '../eqfx-detalle-operaciones-venc/eqfx-detalle-operaciones-venc.module';
import {EqfxPerfilRiesgoDirecModule} from '../eqfx-perfil-riesgo-direc/eqfx-perfil-riesgo-direc.module';
import {EqfxDeudaReportadaInfoModule} from '../eqfx-deuda-reportada-info/eqfx-deuda-reportada-info.module';
import {EqfxEvolucionHistDisEndRecursivoModule} from '../eqfx-evolucion-hist-dis-end-recursivo/eqfx-evolucion-hist-dis-end-recursivo.module';
import {EqfxDeudaReportadaRfrModule} from '../eqfx-deuda-reportada-rfr/eqfx-deuda-reportada-rfr.module';
import {EqfxAnalisisSaldoVencerModule} from '../eqfx-analisis-saldo-vencer/eqfx-analisis-saldo-vencer.module';
import {EqfxEvolucionHistDisEndeudamientoModule} from '../eqfx-evolucion-hist-dis-endeudamiento/eqfx-evolucion-hist-dis-endeudamiento.module';
import {EqfxCreditosOtorg12UltMesEdModule} from '../eqfx-creditos-otorg12-ult-mes-ed/eqfx-creditos-otorg12-ult-mes-ed.module';
import {EqfxInfoPosteriorFechaCorteModule} from '../eqfx-info-posterior-fecha-corte/eqfx-info-posterior-fecha-corte.module';
import {EqfxEntidadesConsultadasModule} from '../eqfx-entidades-consultadas/eqfx-entidades-consultadas.module';

@Module({
  imports: [
    EqfxIndicadoresDeudaModule,
    EqfxIndicadoresDeudaHistoricaModule,
    EqfxResultadoSegmentacionModule,
    EqfxResultadoPoliticasModule,
    EqfxScorePuntajeV3Module,
    EqfxDetalleDeudaActModule,
    EqfxCalificaDetalleTarjModule,
    EqfxDetalleOperacionesVencModule,
    EqfxPerfilRiesgoDirecModule,
    EqfxDeudaReportadaInfoModule,
    EqfxEvolucionHistDisEndRecursivoModule,
    EqfxDeudaReportadaRfrModule,
    EqfxAnalisisSaldoVencerModule,
    EqfxEvolucionHistDisEndeudamientoModule,
    EqfxCreditosOtorg12UltMesEdModule,
    EqfxInfoPosteriorFechaCorteModule,
    EqfxEntidadesConsultadasModule,
  ],
  controllers: [EqfxReporteBuroCreditoController],
  providers: [EqfxReporteBuroCreditoService],
})
export class EqfxReporteBuroCreditoModule {}
