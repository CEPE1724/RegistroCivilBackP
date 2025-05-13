import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxDetalleDeudaActService } from './eqfx-detalle-deuda-act.service';
import { CreateEqfxDetalleDeudaActDto } from './dto/create-eqfx-detalle-deuda-act.dto';
import { UpdateEqfxDetalleDeudaActDto } from './dto/update-eqfx-detalle-deuda-act.dto';
import { Auth } from 'src/auth/decorators';

@Controller('eqfxDetalleDeudaAct')
export class EqfxDetalleDeudaActController {
  constructor(private readonly eqfxDetalleDeudaActService: EqfxDetalleDeudaActService) {}

  
  @Get(':idEqfx')
  @Auth() 
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxDetalleDeudaActService.findAll(+idEqfx);
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.eqfxDetalleDeudaActService.findOne(+id);
  }


}
