import { Controller, Get, Param } from '@nestjs/common';
import { UatEqfxResultadoPoliticasService } from './uat_eqfx_resultado_politicas.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxResultadoPoliticas')
export class UatEqfxResultadoPoliticasController {
	constructor(private readonly uatEqfxResultadoPoliticasService: UatEqfxResultadoPoliticasService) { }

	@Get(':idEqfx')
	@Auth()
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxResultadoPoliticasService.findAll(+idEqfx);
	}
}