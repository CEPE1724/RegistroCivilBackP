import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreNacionalidadService } from './cre_nacionalidad.service';

@Controller('cre-nacionalidad')
export class CreNacionalidadController {
  constructor(private readonly creNacionalidadService: CreNacionalidadService) {}

  @Get()
  findAll() {
    return this.creNacionalidadService.findAll();
  }

}
