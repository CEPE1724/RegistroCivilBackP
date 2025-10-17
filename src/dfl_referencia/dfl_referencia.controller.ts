import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DflReferenciaService } from './dfl_referencia.service';
import { CreateDflReferenciaDto } from './dto/create-dfl_referencia.dto';
import { UpdateDflReferenciaDto } from './dto/update-dfl_referencia.dto';

@Controller('dfl-referencia')
export class DflReferenciaController {
  constructor(private readonly dflReferenciaService: DflReferenciaService) {}

  @Post()
  create(@Body() createDflReferenciaDto: CreateDflReferenciaDto) {
    return this.dflReferenciaService.create(createDflReferenciaDto);
  }

}
