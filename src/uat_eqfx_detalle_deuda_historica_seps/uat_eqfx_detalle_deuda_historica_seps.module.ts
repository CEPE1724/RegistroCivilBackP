import { Module } from '@nestjs/common';
import { UatEqfxDetalleDeudaHistoricaSepsService } from './uat_eqfx_detalle_deuda_historica_seps.service';
import { UatEqfxDetalleDeudaHistoricaSepsController } from './uat_eqfx_detalle_deuda_historica_seps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UatEqfxDetalleDeudaHistoricaSep } from './entities/uat_eqfx_detalle_deuda_historica_sep.entity';

@Module({
	controllers: [UatEqfxDetalleDeudaHistoricaSepsController],
	providers: [UatEqfxDetalleDeudaHistoricaSepsService],
	imports: [TypeOrmModule.forFeature([UatEqfxDetalleDeudaHistoricaSep])],
	exports: [UatEqfxDetalleDeudaHistoricaSepsService]
})
export class UatEqfxDetalleDeudaHistoricaSepsModule { }
