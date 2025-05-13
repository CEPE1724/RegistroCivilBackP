import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreCiudadinmuebleService } from './cre_ciudadinmueble.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-ciudadinmueble')
export class CreCiudadinmuebleController {
  constructor(private readonly creCiudadinmuebleService: CreCiudadinmuebleService) {}

  @Get()
  @Auth()
  findAll() {
    return this.creCiudadinmuebleService.findAll();
  }

}
