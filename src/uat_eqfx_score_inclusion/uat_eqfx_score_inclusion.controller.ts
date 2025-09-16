import { Controller, Get, Param } from '@nestjs/common';
import { UatEqfxScoreInclusionService } from './uat_eqfx_score_inclusion.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxScoreInclusion')
export class UatEqfxScoreInclusionController {
	constructor(private readonly uatEqfxScoreInclusionService: UatEqfxScoreInclusionService) { }

	@Get(':idEqfx')
	@Auth()
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxScoreInclusionService.findAll(+idEqfx);
	}
}
