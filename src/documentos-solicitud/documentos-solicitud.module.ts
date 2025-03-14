import { Module } from '@nestjs/common';
import { DocumentosSolicitudService } from './documentos-solicitud.service';
import { DocumentosSolicitudController } from './documentos-solicitud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentosSolicitud } from './entities/documentos-solicitud.entity';
import {HistorialObservaciones} from './entities/historial-observaciones.entity';


@Module({
  imports: 
  [TypeOrmModule.forFeature([DocumentosSolicitud , HistorialObservaciones])],
  controllers: [DocumentosSolicitudController],
  providers: [DocumentosSolicitudService],
  
 
})
export class DocumentosSolicitudModule {}
