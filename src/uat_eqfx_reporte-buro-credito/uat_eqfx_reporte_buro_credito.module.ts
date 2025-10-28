import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UatEqfxCuotaEstMensModule } from 'src/uat_eqfx_cuota_est_mens/uat_eqfx_cuota_est_mens.module';
import { UatEqfxReporteBuroCreditoController } from './uat_eqfx_reporte_buro_credito.controller';
import { UatEqfxReporteBuroCreditoService } from './uat_eqfx_reporte_buro_credito.service';
import { UatEqfxResultSegmentacionModule } from 'src/uat_eqfx_result_segmentacion/uat_eqfx_result_segmentacion.module';
import { UatEqfxScoreSobreendeudamientoModule } from 'src/uat_eqfx_score_sobreendeudamiento/uat_eqfx_score_sobreendeudamiento.module';
import { UatEqfxScoreInclusionModule } from 'src/uat_eqfx_score_inclusion/uat_eqfx_score_inclusion.module';
import { UatEqfxEntidadesConsultadosModule } from 'src/uat_eqfx_entidades_consultados/uat_eqfx_entidades_consultados.module';
import { UatEqfxResultadoPoliticasModule } from 'src/uat_eqfx_resultado_politicas/uat_eqfx_resultado_politicas.module';
import { UatEqfxDetalleDeudaActualSbModule } from 'src/uat_eqfx_detalle_deuda_actual_sb/uat_eqfx_detalle_deuda_actual_sb.module';
import { UatEqfxDetalleEstructuraVencimientoModule } from 'src/uat_eqfx_detalle_estructura_vencimiento/uat_eqfx_detalle_estructura_vencimiento.module';
import { UatEqfxIdentificadorPerfilRiesgoDirectoModule } from 'src/uat_eqfx_identificador_perfil_riesgo_directo/uat_eqfx_identificador_perfil_riesgo_directo.module';
import { UatEqfxDeudaHistoricaModule } from 'src/uat_eqfx_deuda_historica/uat_eqfx_deuda_historica.module';
import { UatEqfxValorDeuda3SistemasModule } from 'src/uat_eqfx_valor_deuda_3_sistemas/uat_eqfx_valor_deuda_3_sistemas.module';
import { UatEqfxSaldosPorVencerModule } from 'src/uat_eqfx_saldos_por_vencer/uat_eqfx_saldos_por_vencer.module';
import { UatEqfxEstructuraVencimientoModule } from 'src/uat_eqfx_estructura_vencimiento/uat_eqfx_estructura_vencimiento.module';
import { UatEqfxCreditosOtorgadosModule } from 'src/uat_eqfx_creditos_otorgados/uat_eqfx_creditos_otorgados.module';
import { UatEqfxOperacionesCanceladasModule } from 'src/uat_eqfx_operaciones_canceladas/uat_eqfx_operaciones_canceladas.module';
import { UatEqfxDetalleTarjetasModule } from 'src/uat_eqfx_detalle_tarjetas/uat_eqfx_detalle_tarjetas.module';
import { UatEqfxDetalleDeudaActualSepsModule } from 'src/uat_eqfx_detalle_deuda_actual_seps/uat_eqfx_detalle_deuda_actual_seps.module';
import { UatEqfxDetalleDeudaActualSicomModule } from 'src/uat_eqfx_detalle_deuda_actual_sicom/uat_eqfx_detalle_deuda_actual_sicom.module';
import { UatEqfxDetalleDeudaHistoricaSbModule } from 'src/uat_eqfx_detalle_deuda_historica_sb/uat_eqfx_detalle_deuda_historica_sb.module';
import { UatEqfxDetalleDeudaHistoricaSepsModule } from 'src/uat_eqfx_detalle_deuda_historica_seps/uat_eqfx_detalle_deuda_historica_seps.module';
import { UatEqfxDetalleDeudaHistoricaSicomModule } from 'src/uat_eqfx_detalle_deuda_historica_sicom/uat_eqfx_detalle_deuda_historica_sicom.module';


@Module({
	imports: [
		UatEqfxCuotaEstMensModule,
		UatEqfxResultSegmentacionModule,
		UatEqfxScoreSobreendeudamientoModule,
		UatEqfxScoreInclusionModule,
		UatEqfxEntidadesConsultadosModule,
		UatEqfxResultadoPoliticasModule,
		UatEqfxDetalleDeudaActualSepsModule,
		UatEqfxDetalleDeudaActualSicomModule,
		UatEqfxDetalleDeudaHistoricaSbModule,
		UatEqfxDetalleDeudaHistoricaSepsModule,
		UatEqfxDetalleDeudaHistoricaSicomModule,
		UatEqfxDetalleDeudaActualSbModule,
		UatEqfxDetalleTarjetasModule,
		UatEqfxDetalleEstructuraVencimientoModule,
		UatEqfxIdentificadorPerfilRiesgoDirectoModule,
		UatEqfxDeudaHistoricaModule,
		UatEqfxValorDeuda3SistemasModule,
		UatEqfxSaldosPorVencerModule,
		UatEqfxEstructuraVencimientoModule,
		UatEqfxCreditosOtorgadosModule,
		UatEqfxOperacionesCanceladasModule,
		AuthModule
	],
	controllers: [UatEqfxReporteBuroCreditoController],
	providers: [UatEqfxReporteBuroCreditoService]
})
export class UatEqfxReporteBuroCreditoModule {}