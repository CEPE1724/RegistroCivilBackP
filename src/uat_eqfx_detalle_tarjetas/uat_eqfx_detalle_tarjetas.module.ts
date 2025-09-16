import { Module } from '@nestjs/common';
import { UatEqfxDetalleTarjetasService } from './uat_eqfx_detalle_tarjetas.service';
import { UatEqfxDetalleTarjetasController } from './uat_eqfx_detalle_tarjetas.controller';
import { UatEqfxDetalleTarjeta } from './entities/uat_eqfx_detalle_tarjeta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UatEqfxDetalleTarjetasController],
  providers: [UatEqfxDetalleTarjetasService],
  imports: [TypeOrmModule.forFeature([UatEqfxDetalleTarjeta]), AuthModule],
  exports: [UatEqfxDetalleTarjetasService]
})
export class UatEqfxDetalleTarjetasModule {}
