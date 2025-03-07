import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreEstadoService } from './cre-estado.service';
import { CreateCreEstadoDto } from './dto/create-cre-estado.dto';
import { UpdateCreEstadoDto } from './dto/update-cre-estado.dto';

@Controller('cre-estado')
export class CreEstadoController {
  constructor(private readonly creEstadoService: CreEstadoService) {}

  

  @Get()
  findAll() {
    return this.creEstadoService.findAll();
  }

}
