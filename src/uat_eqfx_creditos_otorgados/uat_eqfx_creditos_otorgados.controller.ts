import { Controller, Get, Param } from '@nestjs/common';
import { UatEqfxCreditosOtorgadosService } from './uat_eqfx_creditos_otorgados.service';
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxCreditosOtorgados')
export class UatEqfxCreditosOtorgadosController {
	constructor(private readonly uatEqfxCreditosOtorgadosService: UatEqfxCreditosOtorgadosService) { }

	@Get(':idEqfx')
	//@Auth()
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxCreditosOtorgadosService.findAll(+idEqfx);
	}
}
