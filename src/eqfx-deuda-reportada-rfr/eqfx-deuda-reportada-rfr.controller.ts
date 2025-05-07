import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxDeudaReportadaRfrService } from './eqfx-deuda-reportada-rfr.service';
import { CreateEqfxDeudaReportadaRfrDto } from './dto/create-eqfx-deuda-reportada-rfr.dto';
import { UpdateEqfxDeudaReportadaRfrDto } from './dto/update-eqfx-deuda-reportada-rfr.dto';

@Controller('eqfxDeudaReportadaRfr')
export class EqfxDeudaReportadaRfrController {
  constructor(private readonly eqfxDeudaReportadaRfrService: EqfxDeudaReportadaRfrService) {}

  @Get(':idEqfx')
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxDeudaReportadaRfrService.findAll(+idEqfx);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eqfxDeudaReportadaRfrService.findOne(+id);
  }

}
