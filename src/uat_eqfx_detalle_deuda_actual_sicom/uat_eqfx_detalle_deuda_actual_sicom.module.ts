import { Module } from '@nestjs/common';
import { UatEqfxDetalleDeudaActualSicomService } from './uat_eqfx_detalle_deuda_actual_sicom.service';
import { UatEqfxDetalleDeudaActualSicomController } from './uat_eqfx_detalle_deuda_actual_sicom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UatEqfxDetalleDeudaActualSicom } from './entities/uat_eqfx_detalle_deuda_actual_sicom.entity';

@Module({
	controllers: [UatEqfxDetalleDeudaActualSicomController],
	providers: [UatEqfxDetalleDeudaActualSicomService],
	imports: [TypeOrmModule.forFeature([UatEqfxDetalleDeudaActualSicom])],
	exports: [UatEqfxDetalleDeudaActualSicomService]
})
export class UatEqfxDetalleDeudaActualSicomModule { }
