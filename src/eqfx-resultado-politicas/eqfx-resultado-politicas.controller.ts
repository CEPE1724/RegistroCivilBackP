import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxResultadoPoliticasService } from './eqfx-resultado-politicas.service';
import { CreateEqfxResultadoPoliticaDto } from './dto/create-eqfx-resultado-politica.dto';
import { UpdateEqfxResultadoPoliticaDto } from './dto/update-eqfx-resultado-politica.dto';
import { Auth } from 'src/auth/decorators';

@Controller('eqfxResultadoPoliticas')
export class EqfxResultadoPoliticasController {
  constructor(private readonly eqfxResultadoPoliticasService: EqfxResultadoPoliticasService) {}


  @Get()
  @Auth() 
  findAll() {
    return this.eqfxResultadoPoliticasService.findAll();
  }

  @Get(':idEqfx')
  @Auth() 
  findOne(@Param('idEqfx') idEqfx: string) {
    return this.eqfxResultadoPoliticasService.findOne(+idEqfx);
  }

}
