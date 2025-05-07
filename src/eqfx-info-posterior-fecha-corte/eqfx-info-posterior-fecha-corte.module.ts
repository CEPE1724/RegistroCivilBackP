import { Module } from '@nestjs/common';
import { EqfxInfoPosteriorFechaCorteService } from './eqfx-info-posterior-fecha-corte.service';
import { EqfxInfoPosteriorFechaCorteController } from './eqfx-info-posterior-fecha-corte.controller';
import { EqfxInfoPosteriorFechaCorte } from './entities/eqfx-info-posterior-fecha-corte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EqfxInfoPosteriorFechaCorteController],
  providers: [EqfxInfoPosteriorFechaCorteService],
  imports: [TypeOrmModule.forFeature([EqfxInfoPosteriorFechaCorte])],
  exports: [EqfxInfoPosteriorFechaCorteService],
})
export class EqfxInfoPosteriorFechaCorteModule {}
