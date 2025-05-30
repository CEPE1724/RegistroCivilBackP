import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoTrabajoService } from './tipo-trabajo.service';
import { CreateTipoTrabajoDto } from './dto/create-tipo-trabajo.dto';
import { UpdateTipoTrabajoDto } from './dto/update-tipo-trabajo.dto';
import { Auth } from 'src/auth/decorators';

@Controller('tipo-trabajo')
export class TipoTrabajoController {
  constructor(private readonly tipoTrabajoService: TipoTrabajoService) {}

 

  @Get()
  @Auth()
  findAll() {
    return this.tipoTrabajoService.findAll();
  }

  
}
