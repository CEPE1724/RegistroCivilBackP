import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTipocalificacionService } from './cre-tipocalificacion.service';
import { CreateCreTipocalificacionDto } from './dto/create-cre-tipocalificacion.dto';
import { UpdateCreTipocalificacionDto } from './dto/update-cre-tipocalificacion.dto';

@Controller('cre-tipocalificacion')
export class CreTipocalificacionController {
  constructor(private readonly creTipocalificacionService: CreTipocalificacionService) {}


  @Get()
  findAll() {
    return this.creTipocalificacionService.findAll();
  }

}
