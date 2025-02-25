import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoordenadasprefacturaService } from './coordenadasprefactura.service';
import { CreateCoordenadasprefacturaDto } from './dto/create-coordenadasprefactura.dto';
import { UpdateCoordenadasprefacturaDto } from './dto/update-coordenadasprefactura.dto';

@Controller('coordenadasprefactura')
export class CoordenadasprefacturaController {
  constructor(private readonly coordenadasprefacturaService: CoordenadasprefacturaService) {}

  @Get('all')
  findAll() {
    return this.coordenadasprefacturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coordenadasprefacturaService.findOne(+id);
  }

}

