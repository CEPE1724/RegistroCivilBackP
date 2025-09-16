import { Controller, Get, Param } from '@nestjs/common';
import { UatEqfxEntidadesConsultadosService } from './uat_eqfx_entidades_consultados.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxEntidadesConsultados')
export class UatEqfxEntidadesConsultadosController {
	constructor(private readonly uatEqfxEntidadesConsultadosService: UatEqfxEntidadesConsultadosService) { }

	@Get(':idEqfx')
	@Auth()
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxEntidadesConsultadosService.findAll(+idEqfx);
	}
}
