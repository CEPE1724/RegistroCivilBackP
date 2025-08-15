import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotivoContinuidadService } from './motivo-continuidad.service';
import { CreateMotivoContinuidadDto } from './dto/create-motivo-continuidad.dto';
import { UpdateMotivoContinuidadDto } from './dto/update-motivo-continuidad.dto';
import { Auth } from '../auth/decorators';
@Controller('motivo-continuidad')
export class MotivoContinuidadController {
  constructor(private readonly motivoContinuidadService: MotivoContinuidadService) {}


  @Get()
  @Auth()
  findAll() {
    return this.motivoContinuidadService.findAll();
  }

 
}
