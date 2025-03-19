import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FechaAnalistaService } from './fecha-analista.service';
import { CreateFechaAnalistaDto } from './dto/create-fecha-analista.dto';
import { UpdateFechaAnalistaDto } from './dto/update-fecha-analista.dto';

@Controller('fecha-analista')
export class FechaAnalistaController {
  constructor(private readonly fechaAnalistaService: FechaAnalistaService) {}



  @Get()
  findAll() {
    return this.fechaAnalistaService.getFechaAnalistaWithNextWeek();
  }

}
