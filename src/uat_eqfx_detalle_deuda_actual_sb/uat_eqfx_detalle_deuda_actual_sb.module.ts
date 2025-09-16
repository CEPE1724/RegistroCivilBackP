import { Module } from '@nestjs/common';
import { UatEqfxDetalleDeudaActualSbService } from './uat_eqfx_detalle_deuda_actual_sb.service';
import { UatEqfxDetalleDeudaActualSbController } from './uat_eqfx_detalle_deuda_actual_sb.controller';
import { UatEqfxDetalleDeudaActualSb } from './entities/uat_eqfx_detalle_deuda_actual_sb.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [UatEqfxDetalleDeudaActualSbController],
	providers: [UatEqfxDetalleDeudaActualSbService],
	imports: [TypeOrmModule.forFeature([UatEqfxDetalleDeudaActualSb]), AuthModule],
	exports: [UatEqfxDetalleDeudaActualSbService]
})
export class UatEqfxDetalleDeudaActualSbModule { }
