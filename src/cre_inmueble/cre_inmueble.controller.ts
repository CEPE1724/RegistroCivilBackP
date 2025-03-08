import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreInmuebleService } from './cre_inmueble.service';

@Controller('cre-inmueble')
export class CreInmuebleController {
  constructor(private readonly creInmuebleService: CreInmuebleService) {}

  @Get()
  findAll() {
    return this.creInmuebleService.findAll();
  }

}
