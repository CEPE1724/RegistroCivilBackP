import { Module } from '@nestjs/common';
import { EqfxScorePuntajeV3Service } from './eqfx-score-puntaje-v3.service';
import { EqfxScorePuntajeV3Controller } from './eqfx-score-puntaje-v3.controller';
import {EqfxScorePuntajeV3} from './entities/eqfx-score-puntaje-v3.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [EqfxScorePuntajeV3Controller],
  providers: [EqfxScorePuntajeV3Service],
  imports: [TypeOrmModule.forFeature([EqfxScorePuntajeV3]), AuthModule],
  exports: [EqfxScorePuntajeV3Service]
})
export class EqfxScorePuntajeV3Module {}
