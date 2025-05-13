import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxCalificaDetalleTarjService } from './eqfx-califica-detalle-tarj.service';
import { CreateEqfxCalificaDetalleTarjDto } from './dto/create-eqfx-califica-detalle-tarj.dto';
import { UpdateEqfxCalificaDetalleTarjDto } from './dto/update-eqfx-califica-detalle-tarj.dto';
import { Auth } from 'src/auth/decorators';

@Controller('eqfxCalificaDetalleTarj')
export class EqfxCalificaDetalleTarjController {
  constructor(private readonly eqfxCalificaDetalleTarjService: EqfxCalificaDetalleTarjService) {}

  @Get(':idEqfx')
  @Auth() 
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxCalificaDetalleTarjService.findAll(+idEqfx);
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.eqfxCalificaDetalleTarjService.findOne(+id);
  }

}
