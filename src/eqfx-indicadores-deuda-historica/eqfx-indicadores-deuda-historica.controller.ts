import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxIndicadoresDeudaHistoricaService } from './eqfx-indicadores-deuda-historica.service';
import { CreateEqfxIndicadoresDeudaHistoricaDto } from './dto/create-eqfx-indicadores-deuda-historica.dto';
import { UpdateEqfxIndicadoresDeudaHistoricaDto } from './dto/update-eqfx-indicadores-deuda-historica.dto';

@Controller('eqfxIndicadoresDeudaHistorica')
export class EqfxIndicadoresDeudaHistoricaController {
  constructor(private readonly eqfxIndicadoresDeudaHistoricaService: EqfxIndicadoresDeudaHistoricaService) {}


  @Get(':idEqfx')
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxIndicadoresDeudaHistoricaService.findAll(+idEqfx);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eqfxIndicadoresDeudaHistoricaService.findOne(+id);
  }

}
