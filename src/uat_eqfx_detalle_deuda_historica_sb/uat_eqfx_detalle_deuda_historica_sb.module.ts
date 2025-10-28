import { Module } from '@nestjs/common';
import { UatEqfxDetalleDeudaHistoricaSbService } from './uat_eqfx_detalle_deuda_historica_sb.service';
import { UatEqfxDetalleDeudaHistoricaSbController } from './uat_eqfx_detalle_deuda_historica_sb.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UatEqfxDetalleDeudaHistoricaSb } from './entities/uat_eqfx_detalle_deuda_historica_sb.entity';

@Module({
	controllers: [UatEqfxDetalleDeudaHistoricaSbController],
	providers: [UatEqfxDetalleDeudaHistoricaSbService],
	imports: [TypeOrmModule.forFeature([UatEqfxDetalleDeudaHistoricaSb])],
	exports: [UatEqfxDetalleDeudaHistoricaSbService]
})
export class UatEqfxDetalleDeudaHistoricaSbModule { }
