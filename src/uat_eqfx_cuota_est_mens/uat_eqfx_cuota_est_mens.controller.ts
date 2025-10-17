import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxCuotaEstMensService } from './uat_eqfx_cuota_est_mens.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxCuotaEstMens')
export class UatEqfxCuotaEstMensController {
	constructor(private readonly uatEqfxCuotaEstMensService: UatEqfxCuotaEstMensService) { }


	@Get(':idEqfx')
	@Auth()
	findOne(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxCuotaEstMensService.findOne(+idEqfx);
	}

}
