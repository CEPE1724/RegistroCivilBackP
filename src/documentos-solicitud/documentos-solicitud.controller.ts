import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentosSolicitudService } from './documentos-solicitud.service';
import { CreateDocumentosSolicitudDto } from './dto/create-documentos-solicitud.dto';
import { UpdateDocumentoStatusDto } from './dto/update-documentos-solicitud.dto'; // Correcto aquí


@Controller('documentos-solicitud')
export class DocumentosSolicitudController {
  constructor(private readonly documentosSolicitudService: DocumentosSolicitudService) {}

  @Post()
  create(@Body() createDocumentosSolicitudDto: CreateDocumentosSolicitudDto) {
    return this.documentosSolicitudService.create(createDocumentosSolicitudDto);
  }
   

  @Get(':idSolicitud')
  async findBySolicitud(@Param('idSolicitud') idSolicitud: string) {
    return await this.documentosSolicitudService.findBySolicitud(Number(idSolicitud));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDocumentoStatusDto: UpdateDocumentoStatusDto) {
    return await this.documentosSolicitudService.update(Number(id), updateDocumentoStatusDto);
  }
}


