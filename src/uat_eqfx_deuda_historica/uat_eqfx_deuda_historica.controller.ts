import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxDeudaHistoricaService } from './uat_eqfx_deuda_historica.service';

@Controller('uatEqfxDeudaHistorica')
export class UatEqfxDeudaHistoricaController {
	constructor(private readonly uatEqfxDeudaHistoricaService: UatEqfxDeudaHistoricaService) { }

	@Get(':idEqfx')
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxDeudaHistoricaService.findAll(+idEqfx);
	}
}
