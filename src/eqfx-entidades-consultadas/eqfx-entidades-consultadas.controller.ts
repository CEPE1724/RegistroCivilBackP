import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxEntidadesConsultadasService } from './eqfx-entidades-consultadas.service';
import { CreateEqfxEntidadesConsultadaDto } from './dto/create-eqfx-entidades-consultada.dto';
import { UpdateEqfxEntidadesConsultadaDto } from './dto/update-eqfx-entidades-consultada.dto';
import { Auth } from 'src/auth/decorators';

@Controller('eqfxEntidadesConsultadas')
export class EqfxEntidadesConsultadasController {
  constructor(private readonly eqfxEntidadesConsultadasService: EqfxEntidadesConsultadasService) {}

  @Get(':idEqfx')
  @Auth() 
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxEntidadesConsultadasService.findAll(+idEqfx);
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.eqfxEntidadesConsultadasService.findOne(+id);
  }
}
