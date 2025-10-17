import { Injectable } from '@nestjs/common';
import { UatEqfxCreditosOtorgadosService } from 'src/uat_eqfx_creditos_otorgados/uat_eqfx_creditos_otorgados.service';
import { UatEqfxCuotaEstMensService } from 'src/uat_eqfx_cuota_est_mens/uat_eqfx_cuota_est_mens.service';
import { UatEqfxDetalleDeudaActualSbService } from 'src/uat_eqfx_detalle_deuda_actual_sb/uat_eqfx_detalle_deuda_actual_sb.service';
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
		private readonly segmentacion: UatEqfxResultSegmentacionService,
		private readonly scoreSobreendeudamiento: UatEqfxScoreSobreendeudamientoService,

		private readonly score: UatEqfxScoreInclusionService,

		private readonly politicas: UatEqfxResultadoPoliticasService,

		//tabla 1
		//tabla 2
		private readonly deudaReportada: UatEqfxDetalleDeudaActualSbService, //tabla 3
		private readonly detalleTarj: UatEqfxDetalleTarjetasService, //tabla4
		private readonly detalleOperaciones: UatEqfxDetalleEstructuraVencimientoService, //tabla5
		private readonly indicadoresPerfilRiesgo: UatEqfxIdentificadorPerfilRiesgoDirectoService, //tabla6
		//tabla7
		private readonly deudaHistorica: UatEqfxDeudaHistoricaService, //tabla8
		private readonly deudaTotalRfr: UatEqfxValorDeuda3SistemasService, //tabla9
		private readonly analisisSaldoVencer: UatEqfxSaldosPorVencerService, //tabla10
		private readonly compoEstructuraVenc: UatEqfxEstructuraVencimientoService, //tabla11
		private readonly creditosOtorgados12m: UatEqfxCreditosOtorgadosService, //tabla12
		private readonly ultimas10Operaciones: UatEqfxOperacionesCanceladasService, //tabla13
		private readonly entidadesConsultadas: UatEqfxEntidadesConsultadosService,//tabla14
	) { }

	async findAll(idEqfx: number) {
		const [
			cuotaEstMens, segmentacion, scoreSobreendeudamiento, score, politicas,
			deudaReportada, detalleTarj, detalleOperaciones, indicadoresPerfilRiesgo, deudaHistorica, deudaTotalRfr, analisisSaldoVencer, compoEstructuraVenc, creditosOtorgados12m, ultimas10Operaciones, entidadesConsultadas
		] = await Promise.all([
			this.cuotaEstMens.findOne(idEqfx),
			this.segmentacion.findOne(idEqfx),
			this.scoreSobreendeudamiento.findOne(idEqfx),
			this.score.findOne(idEqfx),
			this.politicas.findAll(idEqfx),
			this.deudaReportada.findAll(idEqfx),
			this.detalleTarj.findAll(idEqfx),
			this.detalleOperaciones.findAll(idEqfx),
			this.indicadoresPerfilRiesgo.findAll(idEqfx),
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
			deudaReportada,
			detalleTarj,
			detalleOperaciones,
			indicadoresPerfilRiesgo,
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
