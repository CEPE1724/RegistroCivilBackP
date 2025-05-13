import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxDetalleOperacionesVencService } from './eqfx-detalle-operaciones-venc.service';
import { CreateEqfxDetalleOperacionesVencDto } from './dto/create-eqfx-detalle-operaciones-venc.dto';
import { UpdateEqfxDetalleOperacionesVencDto } from './dto/update-eqfx-detalle-operaciones-venc.dto';
import { Auth } from 'src/auth/decorators';
@Controller('eqfxDetalleOperacionesVenc')
export class EqfxDetalleOperacionesVencController {
  constructor(private readonly eqfxDetalleOperacionesVencService: EqfxDetalleOperacionesVencService) {}


  @Get(':idEqfx')
  @Auth() 
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxDetalleOperacionesVencService.findAll(+idEqfx);
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.eqfxDetalleOperacionesVencService.findOne(+id);
  }

}
