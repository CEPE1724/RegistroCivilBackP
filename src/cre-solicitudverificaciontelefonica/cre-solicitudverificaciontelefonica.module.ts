import { Module } from '@nestjs/common';
import { CreSolicitudverificaciontelefonicaService } from './cre-solicitudverificaciontelefonica.service';
import { CreSolicitudverificaciontelefonicaController } from './cre-solicitudverificaciontelefonica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreSolicitudverificaciontelefonica } from './entities/cre-solicitudverificaciontelefonica.entity';

@Module({
  controllers: [CreSolicitudverificaciontelefonicaController],
  providers: [CreSolicitudverificaciontelefonicaService],
  imports: [TypeOrmModule.forFeature([CreSolicitudverificaciontelefonica])],
})
export class CreSolicitudverificaciontelefonicaModule {}
