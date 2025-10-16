import { Module } from '@nestjs/common';
import { CorporacionDflService } from './corporacion-dfl.service';
import { CorporacionDflController } from './corporacion-dfl.controller';
import { Tokensia365 } from '../tokensia365/entities/tokensia365.entity';
import { Tokensia365Service } from '../tokensia365/tokensia365.service';
import { Analisisdeidentidad } from '../analisisdeidentidad/entities/analisisdeidentidad.entity';
import { AnalisisdeidentidadService } from '../analisisdeidentidad/analisisdeidentidad.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tokensia365, Analisisdeidentidad])],
  controllers: [CorporacionDflController],
  providers: [CorporacionDflService, Tokensia365Service, AnalisisdeidentidadService],
  exports: [Tokensia365Service, AnalisisdeidentidadService],
})
export class CorporacionDflModule {}
