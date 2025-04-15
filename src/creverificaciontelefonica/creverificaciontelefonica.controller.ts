import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreverificaciontelefonicaService } from './creverificaciontelefonica.service';
import { CreateCreverificaciontelefonicaDto } from './dto/create-creverificaciontelefonica.dto';
import { UpdateCreverificaciontelefonicaDto } from './dto/update-creverificaciontelefonica.dto';

@Controller('creverificaciontelefonica')
export class CreverificaciontelefonicaController {
  constructor(private readonly creverificaciontelefonicaService: CreverificaciontelefonicaService) {}

  @Post()
  create(@Body() createCreverificaciontelefonicaDto: CreateCreverificaciontelefonicaDto) {
    return this.creverificaciontelefonicaService.create(createCreverificaciontelefonicaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creverificaciontelefonicaService.findOne(+id);
  }

  
}
