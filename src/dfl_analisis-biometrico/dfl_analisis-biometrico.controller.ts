import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DflAnalisisBiometricoService } from './dfl_analisis-biometrico.service';
import { CreateDflAnalisisBiometricoDto } from './dto/create-dfl_analisis-biometrico.dto';
import { UpdateDflAnalisisBiometricoDto } from './dto/update-dfl_analisis-biometrico.dto';

@Controller('dfl-analisis-biometrico')
export class DflAnalisisBiometricoController {
  constructor(private readonly dflAnalisisBiometricoService: DflAnalisisBiometricoService) {}

  @Post()
  create(@Body() createDflAnalisisBiometricoDto: CreateDflAnalisisBiometricoDto) {
    return this.dflAnalisisBiometricoService.create(createDflAnalisisBiometricoDto);
  }

  
}
