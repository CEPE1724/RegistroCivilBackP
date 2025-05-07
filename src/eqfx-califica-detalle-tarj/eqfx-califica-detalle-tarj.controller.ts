import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxCalificaDetalleTarjService } from './eqfx-califica-detalle-tarj.service';
import { CreateEqfxCalificaDetalleTarjDto } from './dto/create-eqfx-califica-detalle-tarj.dto';
import { UpdateEqfxCalificaDetalleTarjDto } from './dto/update-eqfx-califica-detalle-tarj.dto';

@Controller('eqfxCalificaDetalleTarj')
export class EqfxCalificaDetalleTarjController {
  constructor(private readonly eqfxCalificaDetalleTarjService: EqfxCalificaDetalleTarjService) {}

  @Get(':idEqfx')
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxCalificaDetalleTarjService.findAll(+idEqfx);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eqfxCalificaDetalleTarjService.findOne(+id);
  }

}
