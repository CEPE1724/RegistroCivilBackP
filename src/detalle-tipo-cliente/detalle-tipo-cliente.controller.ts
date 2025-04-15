import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleTipoClienteService } from './detalle-tipo-cliente.service';
import { CreateDetalleTipoClienteDto } from './dto/create-detalle-tipo-cliente.dto';
import { UpdateDetalleTipoClienteDto } from './dto/update-detalle-tipo-cliente.dto';

@Controller('detalle-tipo-cliente')
export class DetalleTipoClienteController {
  constructor(private readonly detalleTipoClienteService: DetalleTipoClienteService) {}



  @Get()
  findAll() {
    return this.detalleTipoClienteService.findAll();
  }


}
