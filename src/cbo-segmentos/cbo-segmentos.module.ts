import { Module } from '@nestjs/common';
import { CboSegmentosService } from './cbo-segmentos.service';
import { CboSegmentosController } from './cbo-segmentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboSegmento } from './entities/cbo-segmento.entity';
import { AuthModule } from "src/auth/auth.module";
@Module({
  imports: [TypeOrmModule.forFeature([CboSegmento]), AuthModule],
  controllers: [CboSegmentosController],
  providers: [CboSegmentosService],
})
export class CboSegmentosModule {}
