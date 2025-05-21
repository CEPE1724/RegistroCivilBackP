import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTipoviviendaService } from './cre_tipovivienda.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-tipovivienda')
export class CreTipoviviendaController {
  constructor(private readonly creTipoviviendaService: CreTipoviviendaService) {}

  @Get()
  @Auth()
  findAll() {
    return this.creTipoviviendaService.findAll();
  }
  
}
