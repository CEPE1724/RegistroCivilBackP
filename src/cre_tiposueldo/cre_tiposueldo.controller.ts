import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTiposueldoService } from './cre_tiposueldo.service';

@Controller('cre-tiposueldo')
export class CreTiposueldoController {
  constructor(private readonly creTiposueldoService: CreTiposueldoService) {}

  @Get()
  findAll() {
    return this.creTiposueldoService.findAll();
  }

}
