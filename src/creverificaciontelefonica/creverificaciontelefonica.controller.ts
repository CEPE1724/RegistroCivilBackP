import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreverificaciontelefonicaService } from './creverificaciontelefonica.service';
import { CreateCreverificaciontelefonicaDto } from './dto/create-creverificaciontelefonica.dto';
import { UpdateCreverificaciontelefonicaDto } from './dto/update-creverificaciontelefonica.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('creverificaciontelefonica')
export class CreverificaciontelefonicaController {
  constructor(private readonly creverificaciontelefonicaService: CreverificaciontelefonicaService) {}

  @Post()
  @Auth()
  create(@Body() createCreverificaciontelefonicaDto: CreateCreverificaciontelefonicaDto) {
    return this.creverificaciontelefonicaService.create(createCreverificaciontelefonicaDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.creverificaciontelefonicaService.findOne(+id);
  }

  
}
