import { Controller, Get, Param } from '@nestjs/common';
import { UatEqfxReporteBuroCreditoService } from './uat_eqfx_reporte_buro_credito.service'
import { Auth } from 'src/auth/decorators';

@Controller('uatEqfxReporteBuroCredito')
export class UatEqfxReporteBuroCreditoController {
	constructor(private readonly uatEqfxReporteBuroCreditoService: UatEqfxReporteBuroCreditoService) { }

	@Get(':idEqfx')
	@Auth()
	async findAll(@Param('idEqfx') idEqfx: number) {
		return this.uatEqfxReporteBuroCreditoService.findAll(+idEqfx);
	}
}