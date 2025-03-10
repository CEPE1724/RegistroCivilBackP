import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NominaService } from './nomina.service';
import { CreateNominaDto } from './dto/create-nomina.dto';
import { UpdateNominaDto } from './dto/update-nomina.dto';

@Controller('nomina')
export class NominaController {
  constructor(private readonly nominaService: NominaService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nominaService.findOne(id);
  }

}
