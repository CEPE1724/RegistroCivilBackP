import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NominaService } from './nomina.service';
import { CreateNominaDto } from './dto/create-nomina.dto';
import { UpdateNominaDto } from './dto/update-nomina.dto';
import { get } from 'http';

import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';


@Controller('nomina')
export class NominaController {
  constructor(private readonly nominaService: NominaService) {}

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.nominaService.findOne(id);
  }

  @Get('Vendedor/:id')
  @Auth()
  findOneId(@Param('id') id: number) {
    return this.nominaService.findOneId(id);
  }
}
