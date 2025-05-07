import { Controller, Get, Param } from '@nestjs/common';
import { EqfxReporteBuroCreditoService } from './eqfx-reporte-buro-credito.service';

@Controller('eqfxReporteBuroCredito')
export class EqfxReporteBuroCreditoController {
  constructor(private readonly eqfxReporteBuroCreditoService: EqfxReporteBuroCreditoService) {}

  @Get(':idEqfx')
  async findAll(@Param('idEqfx') idEqfx: number) {
    return this.eqfxReporteBuroCreditoService.findAll(+idEqfx);
  }
}
