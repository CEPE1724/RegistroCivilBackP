import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxDetalleDeudaActualSepsService } from './uat_eqfx_detalle_deuda_actual_seps.service';


@Controller('uatEqfxDetalleDeudaActualSeps')
export class UatEqfxDetalleDeudaActualSepsController {
  constructor(private readonly uatEqfxDetalleDeudaActualSepsService: UatEqfxDetalleDeudaActualSepsService) {}

  @Get(':idEqfx')
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.uatEqfxDetalleDeudaActualSepsService.findAll(+idEqfx);
  }

}
