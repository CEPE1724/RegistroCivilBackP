import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxDeudaReportadaRfrService } from './eqfx-deuda-reportada-rfr.service';
import { CreateEqfxDeudaReportadaRfrDto } from './dto/create-eqfx-deuda-reportada-rfr.dto';
import { UpdateEqfxDeudaReportadaRfrDto } from './dto/update-eqfx-deuda-reportada-rfr.dto';
import { Auth } from 'src/auth/decorators';

@Controller('eqfxDeudaReportadaRfr')
export class EqfxDeudaReportadaRfrController {
  constructor(private readonly eqfxDeudaReportadaRfrService: EqfxDeudaReportadaRfrService) {}

  @Get(':idEqfx')
  @Auth() 
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxDeudaReportadaRfrService.findAll(+idEqfx);
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.eqfxDeudaReportadaRfrService.findOne(+id);
  }

}
