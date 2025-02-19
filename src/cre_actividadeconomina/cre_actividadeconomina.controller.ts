import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreActividadeconominaService } from './cre_actividadeconomina.service';

@Controller('cre-actividadeconomina')
export class CreActividadeconominaController {
  constructor(private readonly creActividadeconominaService: CreActividadeconominaService) {}
  @Get(':Tipo')
  findAll(@Param('Tipo', ParseIntPipe) Tipo: number) {
    return this.creActividadeconominaService.findAll(Tipo);
  }
  
}
