import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTiempoviviendaService } from './cre_tiempovivienda.service';


@Controller('cre-tiempovivienda')
export class CreTiempoviviendaController {
  constructor(private readonly creTiempoviviendaService: CreTiempoviviendaService) {}


  @Get()
  findAll() {
    return this.creTiempoviviendaService.findAll();
  }

}
