import { Injectable } from '@nestjs/common';
import { UatEqfxCreditosOtorgadosService } from 'src/uat_eqfx_creditos_otorgados/uat_eqfx_creditos_otorgados.service';
import { UatEqfxCuotaEstMensService } from 'src/uat_eqfx_cuota_est_mens/uat_eqfx_cuota_est_mens.service';
import { UatEqfxDetalleDeudaActualSbService } from 'src/uat_eqfx_detalle_deuda_actual_sb/uat_eqfx_detalle_deuda_actual_sb.service';
import { UatEqfxDetalleDeudaActualSepsService } from 'src/uat_eqfx_detalle_deuda_actual_seps/uat_eqfx_detalle_deuda_actual_seps.service';
import { UatEqfxDetalleDeudaActualSicomService } from 'src/uat_eqfx_detalle_deuda_actual_sicom/uat_eqfx_detalle_deuda_actual_sicom.service';
import { UatEqfxDetalleDeudaHistoricaSbService } from 'src/uat_eqfx_detalle_deuda_historica_sb/uat_eqfx_detalle_deuda_historica_sb.service';
import { UatEqfxDetalleDeudaHistoricaSepsService } from 'src/uat_eqfx_detalle_deuda_historica_seps/uat_eqfx_detalle_deuda_historica_seps.service';
import { UatEqfxDetalleDeudaHistoricaSicomService } from 'src/uat_eqfx_detalle_deuda_historica_sicom/uat_eqfx_detalle_deuda_historica_sicom.service';
import { UatEqfxDetalleEstructuraVencimientoService } from 'src/uat_eqfx_detalle_estructura_vencimiento/uat_eqfx_detalle_estructura_vencimiento.service';
import { UatEqfxDetalleTarjetasService } from 'src/uat_eqfx_detalle_tarjetas/uat_eqfx_detalle_tarjetas.service';
import { UatEqfxDeudaHistoricaService } from 'src/uat_eqfx_deuda_historica/uat_eqfx_deuda_historica.service';
import { UatEqfxEntidadesConsultadosService } from 'src/uat_eqfx_entidades_consultados/uat_eqfx_entidades_consultados.service';
import { UatEqfxEstructuraVencimientoService } from 'src/uat_eqfx_estructura_vencimiento/uat_eqfx_estructura_vencimiento.service';
import { UatEqfxIdentificadorPerfilRiesgoDirectoService } from 'src/uat_eqfx_identificador_perfil_riesgo_directo/uat_eqfx_identificador_perfil_riesgo_directo.service';
import { UatEqfxOperacionesCanceladasService } from 'src/uat_eqfx_operaciones_canceladas/uat_eqfx_operaciones_canceladas.service';
import { UatEqfxResultSegmentacionService } from 'src/uat_eqfx_result_segmentacion/uat_eqfx_result_segmentacion.service';
import { UatEqfxResultadoPoliticasService } from 'src/uat_eqfx_resultado_politicas/uat_eqfx_resultado_politicas.service';
import { UatEqfxSaldosPorVencerService } from 'src/uat_eqfx_saldos_por_vencer/uat_eqfx_saldos_por_vencer.service';
import { UatEqfxScoreInclusionService } from 'src/uat_eqfx_score_inclusion/uat_eqfx_score_inclusion.service';
import { UatEqfxScoreSobreendeudamientoService } from 'src/uat_eqfx_score_sobreendeudamiento/uat_eqfx_score_sobreendeudamiento.service';
import { UatEqfxValorDeuda3SistemasService } from 'src/uat_eqfx_valor_deuda_3_sistemas/uat_eqfx_valor_deuda_3_sistemas.service';

@Injectable()
export class UatEqfxReporteBuroCreditoService {
	constructor(
		private readonly cuotaEstMens: UatEqfxCuotaEstMensService,

		// RESULTADO DE EVALUACION
		private readonly segmentacion: UatEqfxResultSegmentacionService,

		//SCORE SOBREENDEUDAMIENTO
		private readonly scoreSobreendeudamiento: UatEqfxScoreSobreendeudamientoService,

		private readonly score: UatEqfxScoreInclusionService,

		//RESULTADO POLÍTICAS
		private readonly politicas: UatEqfxResultadoPoliticasService,

		//tabla 1: INFORMACIÓN CONSOLIDADA ACTUAL
		private readonly infoActualSb: UatEqfxDetalleDeudaActualSbService,
		private readonly infoActualSeps: UatEqfxDetalleDeudaActualSepsService,
		private readonly infoActualSicom: UatEqfxDetalleDeudaActualSicomService,

		//tabla 2: INFORMACIÓN CONSOLIDADA HISTÓRICA
		private readonly infoHistoricaSb: UatEqfxDetalleDeudaHistoricaSbService,
		private readonly infoHistoricaSeps: UatEqfxDetalleDeudaHistoricaSepsService,
		private readonly infoHistoricaSicom: UatEqfxDetalleDeudaHistoricaSicomService,

		//tabla 3: DEUDA REPORTADA POR EL SISTEMA FINANCIERO
		private readonly deudaReportada: UatEqfxDetalleDeudaActualSbService,

		//tabla4: DETALLE DE TARJETAS
		private readonly detalleTarj: UatEqfxDetalleTarjetasService,

		//tabla5: DETALLE OPERACIONES
		private readonly detalleOperaciones: UatEqfxDetalleEstructuraVencimientoService,

		//tabla6: INDICADORES DE PERFIL DE RIESGO
		private readonly indicadoresPerfilRiesgo: UatEqfxIdentificadorPerfilRiesgoDirectoService,

		//tabla7: CENTRAL DE INFOCOM
		private readonly centralInfocom: UatEqfxDetalleDeudaHistoricaSicomService,

		//tabla8: DEUDA HISTÓRICA
		private readonly deudaHistorica: UatEqfxDeudaHistoricaService,

		//tabla9: DEUDA TOTAL REPORTADA FINANCIERO, REGULADO SB, SEPS Y COMERCIAL
		private readonly deudaTotalRfr: UatEqfxValorDeuda3SistemasService,

		//tabla10: ANÁLISIS SALDOS POR VENCER SISTEMA
		private readonly analisisSaldoVencer: UatEqfxSaldosPorVencerService,

		//tabla11: COMPOSICIÓN ESTRUCTURA DEL VENCIMIENTO
		private readonly compoEstructuraVenc: UatEqfxEstructuraVencimientoService,

		//tabla12: CRÉDITOS OTORGADOS ÚLTIMOS 12 MESES
		private readonly creditosOtorgados12m: UatEqfxCreditosOtorgadosService,

		//tabla13: ULTIMAS 10 OPERACIONES CANCELADAS
		private readonly ultimas10Operaciones: UatEqfxOperacionesCanceladasService,

		//tabla14: ENTIDADES CONSULTADAS
		private readonly entidadesConsultadas: UatEqfxEntidadesConsultadosService
	) { }

	async findAll(idEqfx: number) {
		const [
			cuotaEstMens, segmentacion, scoreSobreendeudamiento, score, politicas, infoActualSb, infoActualSeps, infoActualSicom, infoHistoricaSb, infoHistoricaSeps, infoHistoricaSicom, deudaReportada, detalleTarj, detalleOperaciones, indicadoresPerfilRiesgo, centralInfocom, deudaHistorica, deudaTotalRfr, analisisSaldoVencer, compoEstructuraVenc, creditosOtorgados12m, ultimas10Operaciones, entidadesConsultadas
		] = await Promise.all([
			this.cuotaEstMens.findOne(idEqfx),
			this.segmentacion.findOne(idEqfx),
			this.scoreSobreendeudamiento.findOne(idEqfx),
			this.score.findOne(idEqfx),
			this.politicas.findAll(idEqfx),
			this.infoActualSb.findAll(idEqfx),
			this.infoActualSeps.findAll(idEqfx),
			this.infoActualSicom.findAll(idEqfx),
			this.infoHistoricaSb.findAll(idEqfx),
			this.infoHistoricaSeps.findAll(idEqfx),
			this.infoHistoricaSicom.findAll(idEqfx),
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
			cuotaEstMens,
			segmentacion,
			scoreSobreendeudamiento,
			score,
			politicas,
			infoActualSb,
			infoActualSeps,
			infoActualSicom,
			infoHistoricaSb,
			infoHistoricaSeps,
			infoHistoricaSicom,
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
			entidadesConsultadas
		};
	}
}
