import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreSexoService } from './cre_sexo.service';


@Controller('cre-sexo')
export class CreSexoController {
  constructor(private readonly creSexoService: CreSexoService) {}


  @Get()
  findAll() {
    return this.creSexoService.findAll();
  }

}
