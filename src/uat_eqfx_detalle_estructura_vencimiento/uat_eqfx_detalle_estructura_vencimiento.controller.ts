import { Controller, Get, Param } from '@nestjs/common';
import { UatEqfxDetalleEstructuraVencimientoService } from './uat_eqfx_detalle_estructura_vencimiento.service';
import { Auth } from 'src/auth/decorators';


@Controller('uatEqfxDetalleEstructuraVencimiento')
export class UatEqfxDetalleEstructuraVencimientoController {
	constructor(private readonly uatEqfxDetalleEstructuraVencimientoService: UatEqfxDetalleEstructuraVencimientoService) { }

	@Get(':idEqfx')
	@Auth()
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxDetalleEstructuraVencimientoService.findAll(+idEqfx);
	}
}