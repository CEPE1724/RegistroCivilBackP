import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTipodocumentoService } from './cre_tipodocumento.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
/* Aui esta predefinid ala ruta principal de esta api*/
@Controller('cre-tipodocumento')
export class CreTipodocumentoController {
  constructor(private readonly creTipodocumentoService: CreTipodocumentoService) {}

 /* Aui se puede crae una ruta para el metodo get*/
  @Get('findAll')
  @Auth()
  findAll() {
    return this.creTipodocumentoService.findAll();
  }

}
