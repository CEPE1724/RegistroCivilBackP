import { Controller, Get, Param } from '@nestjs/common';
import { UatEqfxIdentificadorPerfilRiesgoDirecto6MesesService } from './uat_eqfx_identificador_perfil_riesgo_directo_6_meses.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxIdentificadorPerfilRiesgoDirecto6Meses')
export class UatEqfxIdentificadorPerfilRiesgoDirecto6MesesController {
	constructor(private readonly uatEqfxIdentificadorPerfilRiesgoDirecto6MesesService: UatEqfxIdentificadorPerfilRiesgoDirecto6MesesService) { }

	@Get(':idEqfx')
	@Auth()
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxIdentificadorPerfilRiesgoDirecto6MesesService.findAll(+idEqfx);
	}
}