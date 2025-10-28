import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxDetalleDeudaHistoricaSepsService } from './uat_eqfx_detalle_deuda_historica_seps.service';

@Controller('uatEqfxDetalleDeudaHistoricaSeps')
export class UatEqfxDetalleDeudaHistoricaSepsController {
  constructor(private readonly uatEqfxDetalleDeudaHistoricaSepsService: UatEqfxDetalleDeudaHistoricaSepsService) {}


  @Get(':idEqfx')
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.uatEqfxDetalleDeudaHistoricaSepsService.findAll(+idEqfx);
  }
}
