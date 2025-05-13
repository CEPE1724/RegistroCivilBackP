import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxIndicadoresDeudaHistoricaService } from './eqfx-indicadores-deuda-historica.service';
import { CreateEqfxIndicadoresDeudaHistoricaDto } from './dto/create-eqfx-indicadores-deuda-historica.dto';
import { UpdateEqfxIndicadoresDeudaHistoricaDto } from './dto/update-eqfx-indicadores-deuda-historica.dto';
import { Auth } from 'src/auth/decorators';
@Controller('eqfxIndicadoresDeudaHistorica')
export class EqfxIndicadoresDeudaHistoricaController {
  constructor(private readonly eqfxIndicadoresDeudaHistoricaService: EqfxIndicadoresDeudaHistoricaService) {}


  @Get(':idEqfx')
  @Auth() 
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxIndicadoresDeudaHistoricaService.findAll(+idEqfx);
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.eqfxIndicadoresDeudaHistoricaService.findOne(+id);
  }

}
