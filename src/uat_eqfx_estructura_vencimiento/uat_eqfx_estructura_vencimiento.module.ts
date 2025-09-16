import { Module } from '@nestjs/common';
import { UatEqfxEstructuraVencimientoService } from './uat_eqfx_estructura_vencimiento.service';
import { UatEqfxEstructuraVencimientoController } from './uat_eqfx_estructura_vencimiento.controller';
import { UatEqfxEstructuraVencimiento } from './entities/uat_eqfx_estructura_vencimiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UatEqfxEstructuraVencimientoController],
  providers: [UatEqfxEstructuraVencimientoService],
  imports: [TypeOrmModule.forFeature([UatEqfxEstructuraVencimiento]), AuthModule],
  exports: [UatEqfxEstructuraVencimientoService]
})
export class UatEqfxEstructuraVencimientoModule {}
