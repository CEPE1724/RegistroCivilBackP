import { Module } from '@nestjs/common';
import { EqfxDetalleOperacionesVencService } from './eqfx-detalle-operaciones-venc.service';
import { EqfxDetalleOperacionesVencController } from './eqfx-detalle-operaciones-venc.controller';
import { EqfxDetalleOperacionesVenc } from './entities/eqfx-detalle-operaciones-venc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EqfxDetalleOperacionesVencController],
  providers: [EqfxDetalleOperacionesVencService],
  imports: [TypeOrmModule.forFeature([EqfxDetalleOperacionesVenc]) , AuthModule],
  exports: [EqfxDetalleOperacionesVencService],
})
export class EqfxDetalleOperacionesVencModule {}
