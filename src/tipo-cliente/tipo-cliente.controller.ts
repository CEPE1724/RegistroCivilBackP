import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoClienteService } from './tipo-cliente.service';
import { CreateTipoClienteDto } from './dto/create-tipo-cliente.dto';
import { UpdateTipoClienteDto } from './dto/update-tipo-cliente.dto';
import { Auth } from 'src/auth/decorators';

@Controller('tipo-cliente')
export class TipoClienteController {
  constructor(private readonly tipoClienteService: TipoClienteService) {}


  @Get()
  @Auth()
  findAll() {
    return this.tipoClienteService.findAll();
  }

}
