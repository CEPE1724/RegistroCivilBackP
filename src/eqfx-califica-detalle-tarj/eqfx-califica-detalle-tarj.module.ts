import { Module } from '@nestjs/common';
import { EqfxCalificaDetalleTarjService } from './eqfx-califica-detalle-tarj.service';
import { EqfxCalificaDetalleTarjController } from './eqfx-califica-detalle-tarj.controller';
import { EqfxCalificaDetalleTarj } from './entities/eqfx-califica-detalle-tarj.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EqfxCalificaDetalleTarjController],
  providers: [EqfxCalificaDetalleTarjService],
  imports: [TypeOrmModule.forFeature([EqfxCalificaDetalleTarj]) ,AuthModule],
  exports: [EqfxCalificaDetalleTarjService],
})
export class EqfxCalificaDetalleTarjModule {}
