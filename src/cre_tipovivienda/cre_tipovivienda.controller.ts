import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTipoviviendaService } from './cre_tipovivienda.service';


@Controller('cre-tipovivienda')
export class CreTipoviviendaController {
  constructor(private readonly creTipoviviendaService: CreTipoviviendaService) {}

  @Get()
  findAll() {
    return this.creTipoviviendaService.findAll();
  }
  
}
