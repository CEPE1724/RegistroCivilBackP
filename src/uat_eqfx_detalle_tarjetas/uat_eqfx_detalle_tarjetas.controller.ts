import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxDetalleTarjetasService } from './uat_eqfx_detalle_tarjetas.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxDetalleTarjetas')
export class UatEqfxDetalleTarjetasController {
  constructor(private readonly uatEqfxDetalleTarjetasService: UatEqfxDetalleTarjetasService) {}

  @Get(':idEqfx')
  @Auth()
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.uatEqfxDetalleTarjetasService.findAll(+idEqfx);
  }
}
