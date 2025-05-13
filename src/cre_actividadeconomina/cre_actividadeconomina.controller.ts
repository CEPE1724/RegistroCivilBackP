import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreActividadeconominaService } from './cre_actividadeconomina.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-actividadeconomina')
export class CreActividadeconominaController {
  constructor(private readonly creActividadeconominaService: CreActividadeconominaService) {}
  @Get(':Tipo')
  @Auth()
  findAll(@Param('Tipo', ParseIntPipe) Tipo: number) {
    return this.creActividadeconominaService.findAll(Tipo);
  }
  
}
