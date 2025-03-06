import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTipodocumentoService } from './cre_tipodocumento.service';
/* Aui esta predefinid ala ruta principal de esta api*/
@Controller('cre-tipodocumento')
export class CreTipodocumentoController {
  constructor(private readonly creTipodocumentoService: CreTipodocumentoService) {}

 /* Aui se puede crae una ruta para el metodo get*/
  @Get('findAll')
  findAll() {
    return this.creTipodocumentoService.findAll();
  }

}
