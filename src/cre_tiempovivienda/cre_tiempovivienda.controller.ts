import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTiempoviviendaService } from './cre_tiempovivienda.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-tiempovivienda')
export class CreTiempoviviendaController {
  constructor(private readonly creTiempoviviendaService: CreTiempoviviendaService) {}


  @Get()
  @Auth()
  findAll() {
    return this.creTiempoviviendaService.findAll();
  }

}
