import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxResultadoPoliticasService } from './eqfx-resultado-politicas.service';
import { CreateEqfxResultadoPoliticaDto } from './dto/create-eqfx-resultado-politica.dto';
import { UpdateEqfxResultadoPoliticaDto } from './dto/update-eqfx-resultado-politica.dto';

@Controller('eqfxResultadoPoliticas')
export class EqfxResultadoPoliticasController {
  constructor(private readonly eqfxResultadoPoliticasService: EqfxResultadoPoliticasService) {}


  @Get()
  findAll() {
    return this.eqfxResultadoPoliticasService.findAll();
  }

  @Get(':idEqfx')
  findOne(@Param('idEqfx') idEqfx: string) {
    return this.eqfxResultadoPoliticasService.findOne(+idEqfx);
  }

}
