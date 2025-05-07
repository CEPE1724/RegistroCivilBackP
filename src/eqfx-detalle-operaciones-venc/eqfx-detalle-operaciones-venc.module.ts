import { Module } from '@nestjs/common';
import { EqfxDetalleOperacionesVencService } from './eqfx-detalle-operaciones-venc.service';
import { EqfxDetalleOperacionesVencController } from './eqfx-detalle-operaciones-venc.controller';
import { EqfxDetalleOperacionesVenc } from './entities/eqfx-detalle-operaciones-venc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EqfxDetalleOperacionesVencController],
  providers: [EqfxDetalleOperacionesVencService],
  imports: [TypeOrmModule.forFeature([EqfxDetalleOperacionesVenc])],
  exports: [EqfxDetalleOperacionesVencService],
})
export class EqfxDetalleOperacionesVencModule {}
