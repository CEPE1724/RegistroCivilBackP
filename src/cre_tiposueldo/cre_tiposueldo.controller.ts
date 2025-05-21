import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTiposueldoService } from './cre_tiposueldo.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-tiposueldo')
export class CreTiposueldoController {
  constructor(private readonly creTiposueldoService: CreTiposueldoService) {}

  @Get()
  @Auth()
  findAll() {
    return this.creTiposueldoService.findAll();
  }

}
