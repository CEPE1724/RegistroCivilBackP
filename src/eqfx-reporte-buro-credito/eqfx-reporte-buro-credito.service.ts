import { Injectable } from '@nestjs/common';
import {EqfxResultadoSegmentacionService} from '../eqfx-resultado-segmentacion/eqfx-resultado-segmentacion.service';
import {EqfxIndicadoresDeudaService} from '../eqfx-indicadores-deuda/eqfx-indicadores-deuda.service';
import {EqfxIndicadoresDeudaHistoricaService} from '../eqfx-indicadores-deuda-historica/eqfx-indicadores-deuda-historica.service';
import {EqfxResultadoPoliticasService} from '../eqfx-resultado-politicas/eqfx-resultado-politicas.service';
import {EqfxScorePuntajeV3Service} from '../eqfx-score-puntaje-v3/eqfx-score-puntaje-v3.service';
import {EqfxDetalleDeudaActService} from '../eqfx-detalle-deuda-act/eqfx-detalle-deuda-act.service';
import {EqfxCalificaDetalleTarjService} from '../eqfx-califica-detalle-tarj/eqfx-califica-detalle-tarj.service';
import {EqfxDetalleOperacionesVencService} from '../eqfx-detalle-operaciones-venc/eqfx-detalle-operaciones-venc.service';
import {EqfxPerfilRiesgoDirecService} from '../eqfx-perfil-riesgo-direc/eqfx-perfil-riesgo-direc.service';
import {EqfxDeudaReportadaInfoService} from '../eqfx-deuda-reportada-info/eqfx-deuda-reportada-info.service';
import {EqfxEvolucionHistDisEndRecursivoService} from '../eqfx-evolucion-hist-dis-end-recursivo/eqfx-evolucion-hist-dis-end-recursivo.service';
import {EqfxDeudaReportadaRfrService} from '../eqfx-deuda-reportada-rfr/eqfx-deuda-reportada-rfr.service';
import {EqfxAnalisisSaldoVencerService} from '../eqfx-analisis-saldo-vencer/eqfx-analisis-saldo-vencer.service';
import {EqfxEvolucionHistDisEndeudamientoService} from '../eqfx-evolucion-hist-dis-endeudamiento/eqfx-evolucion-hist-dis-endeudamiento.service';
import {EqfxCreditosOtorg12UltMesEdService} from '../eqfx-creditos-otorg12-ult-mes-ed/eqfx-creditos-otorg12-ult-mes-ed.service';
import {EqfxInfoPosteriorFechaCorteService} from '../eqfx-info-posterior-fecha-corte/eqfx-info-posterior-fecha-corte.service';
import {EqfxEntidadesConsultadasService} from '../eqfx-entidades-consultadas/eqfx-entidades-consultadas.service';


@Injectable()
export class EqfxReporteBuroCreditoService {
    constructor(
        private readonly segmentacion: EqfxResultadoSegmentacionService,
        private readonly politicas: EqfxResultadoPoliticasService,
        private readonly scorev3: EqfxScorePuntajeV3Service,
        private readonly infoConsolidadaAct: EqfxIndicadoresDeudaService, //tabla1
        private readonly infoConsolidadaHist: EqfxIndicadoresDeudaHistoricaService,  //tabla2
        private readonly deudaReportada: EqfxDetalleDeudaActService, //tabla3
        private readonly detalleTarj: EqfxCalificaDetalleTarjService, //tabla4
        private readonly detalleOperaciones: EqfxDetalleOperacionesVencService, //tabla5
        private readonly indicadoresPerfilRiesgo: EqfxPerfilRiesgoDirecService, //tabla6
        private readonly centralInfocom: EqfxDeudaReportadaInfoService, //tabla7
        private readonly deudaHistorica: EqfxEvolucionHistDisEndRecursivoService, //tabla8
        private readonly deudaTotalRfr: EqfxDeudaReportadaRfrService, //tabla9
        private readonly analisisSaldoVencer: EqfxAnalisisSaldoVencerService, //tabla10
        private readonly compoEstructuraVenc: EqfxEvolucionHistDisEndeudamientoService, //tabla11
        private readonly creditosOtorgados12m: EqfxCreditosOtorg12UltMesEdService, //tabla12
        private readonly ultimas10Operaciones: EqfxInfoPosteriorFechaCorteService, //tabla13
        private readonly entidadesConsultadas: EqfxEntidadesConsultadasService, //tabla14
    ) {}

    async findAll(idEqfx: number) {
        const [
            segmentacion, politicas, scorev3, 
            infoConsolidadaAct, infoConsolidadaHist, deudaReportada, 
            detalleTarj, detalleOperaciones,indicadoresPerfilRiesgo,
            centralInfocom, deudaHistorica, deudaTotalRfr,
            analisisSaldoVencer, compoEstructuraVenc, creditosOtorgados12m,
            ultimas10Operaciones, entidadesConsultadas
        ] = await Promise.all([
            this.segmentacion.findOne(idEqfx),
            this.politicas.findOne(idEqfx),
            this.scorev3.findOne(idEqfx),
            this.infoConsolidadaAct.findAll(idEqfx),
            this.infoConsolidadaHist.findAll(idEqfx),
            this.deudaReportada.findAll(idEqfx),
            this.detalleTarj.findAll(idEqfx),
            this.detalleOperaciones.findAll(idEqfx),
            this.indicadoresPerfilRiesgo.findAll(idEqfx),
            this.centralInfocom.findAll(idEqfx),
            this.deudaHistorica.findAll(idEqfx),
            this.deudaTotalRfr.findAll(idEqfx),
            this.analisisSaldoVencer.findAll(idEqfx),
            this.compoEstructuraVenc.findAll(idEqfx),
            this.creditosOtorgados12m.findAll(idEqfx),
            this.ultimas10Operaciones.findAll(idEqfx),
            this.entidadesConsultadas.findAll(idEqfx),
        ]);

        return {
            segmentacion,
            politicas,
            scorev3,
            infoConsolidadaAct,
            infoConsolidadaHist,
            deudaReportada,
            detalleTarj,
            detalleOperaciones,
            indicadoresPerfilRiesgo,
            centralInfocom,
            deudaHistorica,
            deudaTotalRfr,
            analisisSaldoVencer,
            compoEstructuraVenc,
            creditosOtorgados12m,
            ultimas10Operaciones,
            entidadesConsultadas,
        };       
    }
}
