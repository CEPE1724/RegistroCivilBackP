import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentosSolicitudService } from './documentos-solicitud.service';
import { CreateDocumentosSolicitudDto } from './dto/create-documentos-solicitud.dto';
import { UpdateDocumentosSolicitudDto } from './dto/update-documentos-solicitud.dto';

@Controller('documentos-solicitud')
export class DocumentosSolicitudController {
  constructor(private readonly documentosSolicitudService: DocumentosSolicitudService) {}

  @Post()
  create(@Body() createDocumentosSolicitudDto: CreateDocumentosSolicitudDto) {
    return this.documentosSolicitudService.create(createDocumentosSolicitudDto);
  }

  @Get()
  findAll() {
    return this.documentosSolicitudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentosSolicitudService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentosSolicitudDto: UpdateDocumentosSolicitudDto) {
    return this.documentosSolicitudService.update(+id, updateDocumentosSolicitudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosSolicitudService.remove(+id);
  }
}
