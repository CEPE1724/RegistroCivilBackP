import { Controller, Get, Param } from '@nestjs/common';
import { EqfxReporteBuroCreditoService } from './eqfx-reporte-buro-credito.service';
import { Auth } from 'src/auth/decorators';

@Controller('eqfxReporteBuroCredito')
export class EqfxReporteBuroCreditoController {
  constructor(private readonly eqfxReporteBuroCreditoService: EqfxReporteBuroCreditoService) {}

  @Get(':idEqfx')
  @Auth() 
  async findAll(@Param('idEqfx') idEqfx: number) {
    return this.eqfxReporteBuroCreditoService.findAll(+idEqfx);
  }
}
