import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DflResultadoService } from './dfl_resultado.service';
import { CreateDflResultadoDto } from './dto/create-dfl_resultado.dto';
import { UpdateDflResultadoDto } from './dto/update-dfl_resultado.dto';

@Controller('dfl-resultado')
export class DflResultadoController {
  constructor(private readonly dflResultadoService: DflResultadoService) {}

  @Post()
  create(@Body() createDflResultadoDto: CreateDflResultadoDto) {
    return this.dflResultadoService.create(createDflResultadoDto);
  }

  
}
