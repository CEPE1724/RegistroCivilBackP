import { Module } from '@nestjs/common';
import { EqfxDetalleDeudaActService } from './eqfx-detalle-deuda-act.service';
import { EqfxDetalleDeudaActController } from './eqfx-detalle-deuda-act.controller';
import { EqfxDetalleDeudaAct } from './entities/eqfx-detalle-deuda-act.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EqfxDetalleDeudaActController],
  providers: [EqfxDetalleDeudaActService],
  imports: [TypeOrmModule.forFeature([EqfxDetalleDeudaAct])],
  exports: [EqfxDetalleDeudaActService],

})
export class EqfxDetalleDeudaActModule {}
