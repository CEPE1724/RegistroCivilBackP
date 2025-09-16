import { Module } from '@nestjs/common';
import { UatEqfxDetalleEstructuraVencimientoService } from './uat_eqfx_detalle_estructura_vencimiento.service';
import { UatEqfxDetalleEstructuraVencimientoController } from './uat_eqfx_detalle_estructura_vencimiento.controller';
import { UatEqfxDetalleEstructuraVencimiento } from './entities/uat_eqfx_detalle_estructura_vencimiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UatEqfxDetalleEstructuraVencimientoController],
  providers: [UatEqfxDetalleEstructuraVencimientoService],
  imports: [TypeOrmModule.forFeature([UatEqfxDetalleEstructuraVencimiento]), AuthModule],
  exports: [UatEqfxDetalleEstructuraVencimientoService]
})
export class UatEqfxDetalleEstructuraVencimientoModule {}
