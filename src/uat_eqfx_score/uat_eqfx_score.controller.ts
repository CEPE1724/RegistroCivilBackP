import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxScoreService } from './uat_eqfx_score.service';
import { CreateUatEqfxScoreDto } from './dto/create-uat_eqfx_score.dto';
import { UpdateUatEqfxScoreDto } from './dto/update-uat_eqfx_score.dto';

@Controller('uatEqfxScore')
export class UatEqfxScoreController {
	constructor(private readonly uatEqfxScoreService: UatEqfxScoreService) { }

	@Get(':idEqfx')
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxScoreService.findAll(+idEqfx);
	}

	@Get(':idEqfx')
	findOne(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxScoreService.findOne(+idEqfx);
	}
}
