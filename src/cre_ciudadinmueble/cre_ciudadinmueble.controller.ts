import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreCiudadinmuebleService } from './cre_ciudadinmueble.service';

@Controller('cre-ciudadinmueble')
export class CreCiudadinmuebleController {
  constructor(private readonly creCiudadinmuebleService: CreCiudadinmuebleService) {}

  @Get()
  findAll() {
    return this.creCiudadinmuebleService.findAll();
  }

}
