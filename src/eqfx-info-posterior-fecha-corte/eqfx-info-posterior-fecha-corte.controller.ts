import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxInfoPosteriorFechaCorteService } from './eqfx-info-posterior-fecha-corte.service';
import { CreateEqfxInfoPosteriorFechaCorteDto } from './dto/create-eqfx-info-posterior-fecha-corte.dto';
import { UpdateEqfxInfoPosteriorFechaCorteDto } from './dto/update-eqfx-info-posterior-fecha-corte.dto';

@Controller('eqfxInfoPosteriorFechaCorte')
export class EqfxInfoPosteriorFechaCorteController {
  constructor(private readonly eqfxInfoPosteriorFechaCorteService: EqfxInfoPosteriorFechaCorteService) {}

  @Get(':idEqfx')
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxInfoPosteriorFechaCorteService.findAll(+idEqfx);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eqfxInfoPosteriorFechaCorteService.findOne(+id);
  }

}
