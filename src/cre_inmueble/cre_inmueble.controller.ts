import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreInmuebleService } from './cre_inmueble.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-inmueble')
export class CreInmuebleController {
  constructor(private readonly creInmuebleService: CreInmuebleService) {}

  @Get()
  @Auth()
  findAll() {
    return this.creInmuebleService.findAll();
  }

}
