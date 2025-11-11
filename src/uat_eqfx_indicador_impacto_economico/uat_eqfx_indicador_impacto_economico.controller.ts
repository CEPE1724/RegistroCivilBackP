import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxIndicadorImpactoEconomicoService } from './uat_eqfx_indicador_impacto_economico.service';


@Controller('uatEqfxIndicadorImpactoEconomico')
export class UatEqfxIndicadorImpactoEconomicoController {
	constructor(private readonly uatEqfxIndicadorImpactoEconomicoService: UatEqfxIndicadorImpactoEconomicoService) { }

	@Get(':idEqfx')
	findOne(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxIndicadorImpactoEconomicoService.findOne(+idEqfx);
	}
}
