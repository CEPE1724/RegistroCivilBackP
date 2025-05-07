import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxIndicadoresDeudaService } from './eqfx-indicadores-deuda.service';
import { CreateEqfxIndicadoresDeudaDto } from './dto/create-eqfx-indicadores-deuda.dto';
import { UpdateEqfxIndicadoresDeudaDto } from './dto/update-eqfx-indicadores-deuda.dto';

@Controller('eqfxIndicadoresDeuda')
export class EqfxIndicadoresDeudaController {
  constructor(private readonly eqfxIndicadoresDeudaService: EqfxIndicadoresDeudaService) {}

  @Get(':idEqfx')
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxIndicadoresDeudaService.findAll(+idEqfx);
  }

}
