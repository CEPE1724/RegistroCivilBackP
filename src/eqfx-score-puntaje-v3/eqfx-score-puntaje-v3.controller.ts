import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxScorePuntajeV3Service } from './eqfx-score-puntaje-v3.service';
import { CreateEqfxScorePuntajeV3Dto } from './dto/create-eqfx-score-puntaje-v3.dto';
import { UpdateEqfxScorePuntajeV3Dto } from './dto/update-eqfx-score-puntaje-v3.dto';
import { Auth } from 'src/auth/decorators';

@Controller('eqfxScorePuntajeV3')
export class EqfxScorePuntajeV3Controller {
  constructor(private readonly eqfxScorePuntajeV3Service: EqfxScorePuntajeV3Service) {}

  @Get()
  @Auth() 
  findAll() {
    return this.eqfxScorePuntajeV3Service.findAll();
  }

  @Get(':idEqfx')
  @Auth() 
  findOne(@Param('idEqfx') idEqfx: string) {
    return this.eqfxScorePuntajeV3Service.findOne(+idEqfx);
  }

}
