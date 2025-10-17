import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { DflIndicadoresAnversoService } from './dfl_indicadores-anverso.service';
import { CreateDflIndicadoresAnversoDto } from './dto/create-dfl_indicadores-anverso.dto';
import { UpdateDflIndicadoresAnversoDto } from './dto/update-dfl_indicadores-anverso.dto';

@Controller('dfl-indicadores-anverso')
export class DflIndicadoresAnversoController {
  constructor(private readonly dflIndicadoresAnversoService: DflIndicadoresAnversoService) { }

  @Post()
  create(@Body() createDflIndicadoresAnversoDto: CreateDflIndicadoresAnversoDto) {
    return this.dflIndicadoresAnversoService.create(createDflIndicadoresAnversoDto);
  }

}