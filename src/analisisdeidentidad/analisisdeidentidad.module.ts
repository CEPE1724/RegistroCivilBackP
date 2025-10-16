import { Module } from '@nestjs/common';
import { AnalisisdeidentidadService } from './analisisdeidentidad.service';
import { AnalisisdeidentidadController } from './analisisdeidentidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analisisdeidentidad } from './entities/analisisdeidentidad.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Analisisdeidentidad])],
  controllers: [AnalisisdeidentidadController],
  providers: [AnalisisdeidentidadService],
})
export class AnalisisdeidentidadModule {}
