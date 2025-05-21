import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxPerfilRiesgoDirecService } from './eqfx-perfil-riesgo-direc.service';
import { CreateEqfxPerfilRiesgoDirecDto } from './dto/create-eqfx-perfil-riesgo-direc.dto';
import { UpdateEqfxPerfilRiesgoDirecDto } from './dto/update-eqfx-perfil-riesgo-direc.dto';
import { Auth } from 'src/auth/decorators';
@Controller('eqfxPerfilRiesgoDirec')
export class EqfxPerfilRiesgoDirecController {
  constructor(private readonly eqfxPerfilRiesgoDirecService: EqfxPerfilRiesgoDirecService) {}


  @Get(':idEqfx')
  @Auth() 
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxPerfilRiesgoDirecService.findAll(+idEqfx);
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.eqfxPerfilRiesgoDirecService.findOne(+id);
  }

}
