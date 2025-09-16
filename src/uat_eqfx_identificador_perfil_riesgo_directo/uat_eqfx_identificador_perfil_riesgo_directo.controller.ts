import { Controller, Get, Patch, Param } from '@nestjs/common';
import { UatEqfxIdentificadorPerfilRiesgoDirectoService } from './uat_eqfx_identificador_perfil_riesgo_directo.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxIdentificadorPerfilRiesgoDirecto')
export class UatEqfxIdentificadorPerfilRiesgoDirectoController {
  constructor(private readonly uatEqfxIdentificadorPerfilRiesgoDirectoService: UatEqfxIdentificadorPerfilRiesgoDirectoService) {}

  @Get(':idEqfx')
  @Auth()
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.uatEqfxIdentificadorPerfilRiesgoDirectoService.findAll(+idEqfx);
  }
}
