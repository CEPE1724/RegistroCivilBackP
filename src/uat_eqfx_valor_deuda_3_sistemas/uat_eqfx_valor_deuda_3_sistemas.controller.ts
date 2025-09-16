import { Controller, Get, Param } from '@nestjs/common';
import { UatEqfxValorDeuda3SistemasService } from './uat_eqfx_valor_deuda_3_sistemas.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxValorDeuda3Sistemas')
export class UatEqfxValorDeuda3SistemasController {
	constructor(private readonly uatEqfxValorDeuda3SistemasService: UatEqfxValorDeuda3SistemasService) { }

	@Get(':idEqfx')
	@Auth()
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxValorDeuda3SistemasService.findAll(+idEqfx);
	}
}
