import { Module } from '@nestjs/common';
import { UatEqfxDetalleDeudaHistoricaSicomService } from './uat_eqfx_detalle_deuda_historica_sicom.service';
import { UatEqfxDetalleDeudaHistoricaSicomController } from './uat_eqfx_detalle_deuda_historica_sicom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UatEqfxDetalleDeudaHistoricaSicom } from './entities/uat_eqfx_detalle_deuda_historica_sicom.entity';

@Module({
	controllers: [UatEqfxDetalleDeudaHistoricaSicomController],
	providers: [UatEqfxDetalleDeudaHistoricaSicomService],
	imports: [TypeOrmModule.forFeature([UatEqfxDetalleDeudaHistoricaSicom])],
	exports: [UatEqfxDetalleDeudaHistoricaSicomService]
})
export class UatEqfxDetalleDeudaHistoricaSicomModule { }
