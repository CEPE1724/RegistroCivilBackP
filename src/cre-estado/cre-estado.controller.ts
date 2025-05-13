import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreEstadoService } from './cre-estado.service';
import { CreateCreEstadoDto } from './dto/create-cre-estado.dto';
import { UpdateCreEstadoDto } from './dto/update-cre-estado.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-estado')
export class CreEstadoController {
  constructor(private readonly creEstadoService: CreEstadoService) {}

  

  @Get()
  @Auth()
  findAll() {
    return this.creEstadoService.findAll();
  }

}
