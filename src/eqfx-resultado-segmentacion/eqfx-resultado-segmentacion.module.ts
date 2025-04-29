import { Module } from '@nestjs/common';
import { EqfxResultadoSegmentacionService } from './eqfx-resultado-segmentacion.service';
import { EqfxResultadoSegmentacionController } from './eqfx-resultado-segmentacion.controller';
import {EqfxResultadoSegmentacion} from './entities/eqfx-resultado-segmentacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EqfxResultadoSegmentacionController],
  providers: [EqfxResultadoSegmentacionService],
  imports: [TypeOrmModule.forFeature([EqfxResultadoSegmentacion])],
  exports: [EqfxResultadoSegmentacionService]
})
export class EqfxResultadoSegmentacionModule {}
