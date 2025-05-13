import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTipocalificacionService } from './cre-tipocalificacion.service';
import { CreateCreTipocalificacionDto } from './dto/create-cre-tipocalificacion.dto';
import { UpdateCreTipocalificacionDto } from './dto/update-cre-tipocalificacion.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-tipocalificacion')
export class CreTipocalificacionController {
  constructor(private readonly creTipocalificacionService: CreTipocalificacionService) {}


  @Get()
  @Auth()
  findAll() {
    return this.creTipocalificacionService.findAll();
  }

}
