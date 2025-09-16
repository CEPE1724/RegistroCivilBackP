import { Controller, Get, Param } from '@nestjs/common';
import { UatEqfxSaldosPorVencerService } from './uat_eqfx_saldos_por_vencer.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxSaldosPorVencer')
export class UatEqfxSaldosPorVencerController {
	constructor(private readonly uatEqfxSaldosPorVencerService: UatEqfxSaldosPorVencerService) { }

	@Get(':idEqfx')
	@Auth()
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxSaldosPorVencerService.findAll(+idEqfx);
	}
}
