import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreBarrioService } from './cre_barrio.service';
import { CreateCreBarrioDto } from './dto/create-cre_barrio.dto';
import { UpdateCreBarrioDto } from './dto/update-cre_barrio.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-barrio')
export class CreBarrioController {
  constructor(private readonly creBarrioService: CreBarrioService) {}

  @Get(':idParroquia')
  @Auth()
  async findByParroquia(@Param('idParroquia') idParroquia: string) {
    return await this.creBarrioService.findByParroquia(Number(idParroquia));
  }
}

