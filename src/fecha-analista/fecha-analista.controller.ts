import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FechaAnalistaService } from './fecha-analista.service';
import { CreateFechaAnalistaDto } from './dto/create-fecha-analista.dto';
import { UpdateFechaAnalistaDto } from './dto/update-fecha-analista.dto';
import { Auth } from 'src/auth/decorators';

@Controller('fecha-analista')
export class FechaAnalistaController {
  constructor(private readonly fechaAnalistaService: FechaAnalistaService) {}



  @Get()
  @Auth() 
  findAll() {
    return this.fechaAnalistaService.getFechaAnalistaWithNextWeek();
  }

}
