import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreSexoService } from './cre_sexo.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-sexo')
export class CreSexoController {
  constructor(private readonly creSexoService: CreSexoService) {}


  @Get()
  @Auth()
  findAll() {
    return this.creSexoService.findAll();
  }

}
