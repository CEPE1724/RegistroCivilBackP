import { Controller, Get, Post, Body, Patch, Param, Delete, ParseBoolPipe, ParseIntPipe } from '@nestjs/common';
import { CompraencuestaService } from './compraencuesta.service';

@Controller('compraencuesta')
export class CompraencuestaController {
  constructor(private readonly compraencuestaService: CompraencuestaService) {}

  @Get(':Estado')
  findAll(@Param('Estado',ParseIntPipe) Estado: number) {
     
    return this.compraencuestaService.findAll(Estado);
  }

}
