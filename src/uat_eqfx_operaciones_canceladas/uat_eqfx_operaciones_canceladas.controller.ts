import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxOperacionesCanceladasService } from './uat_eqfx_operaciones_canceladas.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxOperacionesCanceladas')
export class UatEqfxOperacionesCanceladasController {
	constructor(private readonly uatEqfxOperacionesCanceladasService: UatEqfxOperacionesCanceladasService) { }

	@Get(':idEqfx')
	@Auth()
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxOperacionesCanceladasService.findAll(+idEqfx);
	}
}
