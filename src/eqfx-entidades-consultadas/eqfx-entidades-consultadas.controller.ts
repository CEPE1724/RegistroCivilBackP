import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxEntidadesConsultadasService } from './eqfx-entidades-consultadas.service';
import { CreateEqfxEntidadesConsultadaDto } from './dto/create-eqfx-entidades-consultada.dto';
import { UpdateEqfxEntidadesConsultadaDto } from './dto/update-eqfx-entidades-consultada.dto';

@Controller('eqfxEntidadesConsultadas')
export class EqfxEntidadesConsultadasController {
  constructor(private readonly eqfxEntidadesConsultadasService: EqfxEntidadesConsultadasService) {}

  @Get(':idEqfx')
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxEntidadesConsultadasService.findAll(+idEqfx);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eqfxEntidadesConsultadasService.findOne(+id);
  }
}
