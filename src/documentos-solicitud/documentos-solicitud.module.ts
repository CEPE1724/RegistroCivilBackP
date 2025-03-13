import { Module } from '@nestjs/common';
import { DocumentosSolicitudService } from './documentos-solicitud.service';
import { DocumentosSolicitudController } from './documentos-solicitud.controller';

@Module({
  controllers: [DocumentosSolicitudController],
  providers: [DocumentosSolicitudService],
})
export class DocumentosSolicitudModule {}
