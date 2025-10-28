import { Module } from '@nestjs/common';
import { UatEqfxDetalleDeudaActualSepsService } from './uat_eqfx_detalle_deuda_actual_seps.service';
import { UatEqfxDetalleDeudaActualSepsController } from './uat_eqfx_detalle_deuda_actual_seps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UatEqfxDetalleDeudaActualSep } from './entities/uat_eqfx_detalle_deuda_actual_sep.entity';

@Module({
  controllers: [UatEqfxDetalleDeudaActualSepsController],
  providers: [UatEqfxDetalleDeudaActualSepsService],
  imports: [TypeOrmModule.forFeature([UatEqfxDetalleDeudaActualSep])],
  exports: [UatEqfxDetalleDeudaActualSepsService]
})
export class UatEqfxDetalleDeudaActualSepsModule {}
