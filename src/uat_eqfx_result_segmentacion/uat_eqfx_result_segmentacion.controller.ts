import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxResultSegmentacionService } from './uat_eqfx_result_segmentacion.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxResultSegmentacion')
export class UatEqfxResultSegmentacionController {
	constructor(private readonly uatEqfxResultSegmentacionService: UatEqfxResultSegmentacionService) { }

	@Get(':idEqfx')
	@Auth()
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxResultSegmentacionService.findAll(+idEqfx);
	}


	@Get(':idEqfx')
	@Auth()
	findOne(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxResultSegmentacionService.findOne(+idEqfx);
	}
}
