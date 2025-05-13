import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxInfoPosteriorFechaCorteService } from './eqfx-info-posterior-fecha-corte.service';
import { CreateEqfxInfoPosteriorFechaCorteDto } from './dto/create-eqfx-info-posterior-fecha-corte.dto';
import { UpdateEqfxInfoPosteriorFechaCorteDto } from './dto/update-eqfx-info-posterior-fecha-corte.dto';
import { Auth } from 'src/auth/decorators';
@Controller('eqfxInfoPosteriorFechaCorte')
export class EqfxInfoPosteriorFechaCorteController {
  constructor(private readonly eqfxInfoPosteriorFechaCorteService: EqfxInfoPosteriorFechaCorteService) {}

  @Get(':idEqfx')
  @Auth() 
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxInfoPosteriorFechaCorteService.findAll(+idEqfx);
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.eqfxInfoPosteriorFechaCorteService.findOne(+id);
  }

}
