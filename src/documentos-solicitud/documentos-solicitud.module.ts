import { Module } from '@nestjs/common';
import { DocumentosSolicitudService } from './documentos-solicitud.service';
import { DocumentosSolicitudController } from './documentos-solicitud.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentosSolicitud } from './entities/documentos-solicitud.entity';
import {HistorialObservaciones} from './entities/historial-observaciones.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: 
  [TypeOrmModule.forFeature([DocumentosSolicitud , HistorialObservaciones]) , AuthModule],
  controllers: [DocumentosSolicitudController],
  providers: [DocumentosSolicitudService],
  
 

})
export class DocumentosSolicitudModule {}
