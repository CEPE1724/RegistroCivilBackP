import { Controller, Get, Param } from '@nestjs/common';
import { UatEqfxEstructuraVencimientoService } from './uat_eqfx_estructura_vencimiento.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxEstructuraVencimiento')
export class UatEqfxEstructuraVencimientoController {
  constructor(private readonly uatEqfxEstructuraVencimientoService: UatEqfxEstructuraVencimientoService) {}

  @Get(':idEqfx')
  @Auth()
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.uatEqfxEstructuraVencimientoService.findAll(+idEqfx);
  }
}