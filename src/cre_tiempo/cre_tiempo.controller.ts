import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreTiempoService } from './cre_tiempo.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-tiempo')
export class CreTiempoController {
  constructor(private readonly creTiempoService: CreTiempoService) {}

  @Get(':Activo')
  @Auth()
  findAll(@Param('Activo', ParseIntPipe) Activo: number) {
    return this.creTiempoService.findAll(Activo);
  }

}
