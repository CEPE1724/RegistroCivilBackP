import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DflIndicadoresReversoService } from './dfl_indicadores-reverso.service';
import { CreateDflIndicadoresReversoDto } from './dto/create-dfl_indicadores-reverso.dto';
import { UpdateDflIndicadoresReversoDto } from './dto/update-dfl_indicadores-reverso.dto';

@Controller('dfl-indicadores-reverso')
export class DflIndicadoresReversoController {
  constructor(private readonly dflIndicadoresReversoService: DflIndicadoresReversoService) {}

  @Post()
  create(@Body() createDflIndicadoresReversoDto: CreateDflIndicadoresReversoDto) {
    return this.dflIndicadoresReversoService.create(createDflIndicadoresReversoDto);
  }

  
}
