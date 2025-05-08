import { Module } from '@nestjs/common';
import { EqfxDetalleDeudaActService } from './eqfx-detalle-deuda-act.service';
import { EqfxDetalleDeudaActController } from './eqfx-detalle-deuda-act.controller';
import { EqfxDetalleDeudaAct } from './entities/eqfx-detalle-deuda-act.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EqfxDetalleDeudaActController],
  providers: [EqfxDetalleDeudaActService],
  imports: [TypeOrmModule.forFeature([EqfxDetalleDeudaAct]) , AuthModule],
  exports: [EqfxDetalleDeudaActService],

})
export class EqfxDetalleDeudaActModule {}
