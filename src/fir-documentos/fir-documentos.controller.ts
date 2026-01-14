import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FirDocumentosService } from './fir-documentos.service';
import { CreateFirDocumentoDto } from './dto/create-fir-documento.dto';
import { UpdateFirDocumentoDto } from './dto/update-fir-documento.dto';

@Controller('fir-documentos')
export class FirDocumentosController {
  constructor(private readonly firDocumentosService: FirDocumentosService) {}

  @Post()
  create(@Body() createFirDocumentoDto: CreateFirDocumentoDto) {
    return this.firDocumentosService.create(createFirDocumentoDto);
  }

 
}
