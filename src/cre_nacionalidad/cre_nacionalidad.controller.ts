import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreNacionalidadService } from './cre_nacionalidad.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-nacionalidad')
export class CreNacionalidadController {
  constructor(private readonly creNacionalidadService: CreNacionalidadService) {}

  @Get()
  @Auth()
  findAll() {
    return this.creNacionalidadService.findAll();
  }

}
