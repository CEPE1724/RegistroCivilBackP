import { Module } from '@nestjs/common';
import { EqfxResultadoSegmentacionService } from './eqfx-resultado-segmentacion.service';
import { EqfxResultadoSegmentacionController } from './eqfx-resultado-segmentacion.controller';
import {EqfxResultadoSegmentacion} from './entities/eqfx-resultado-segmentacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [EqfxResultadoSegmentacionController],
  providers: [EqfxResultadoSegmentacionService],
  imports: [TypeOrmModule.forFeature([EqfxResultadoSegmentacion]), AuthModule],
  exports: [EqfxResultadoSegmentacionService]
})
export class EqfxResultadoSegmentacionModule {}
