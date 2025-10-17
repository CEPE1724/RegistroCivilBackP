import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DflMetadataProcesadaService } from './dfl_metadata-procesada.service';
import { CreateDflMetadataProcesadaDto } from './dto/create-dfl_metadata-procesada.dto';
import { UpdateDflMetadataProcesadaDto } from './dto/update-dfl_metadata-procesada.dto';

@Controller('dfl-metadata-procesada')
export class DflMetadataProcesadaController {
  constructor(private readonly dflMetadataProcesadaService: DflMetadataProcesadaService) {}

  @Post()
  create(@Body() createDflMetadataProcesadaDto: CreateDflMetadataProcesadaDto) {
    return this.dflMetadataProcesadaService.create(createDflMetadataProcesadaDto);
  }

 
}
