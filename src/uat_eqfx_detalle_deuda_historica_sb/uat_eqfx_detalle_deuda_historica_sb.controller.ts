import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxDetalleDeudaHistoricaSbService } from './uat_eqfx_detalle_deuda_historica_sb.service';

@Controller('uatEqfxDetalleDeudaHistoricaSb')
export class UatEqfxDetalleDeudaHistoricaSbController {
	constructor(private readonly uatEqfxDetalleDeudaHistoricaSbService: UatEqfxDetalleDeudaHistoricaSbService) { }


	@Get(':idEqfx')
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxDetalleDeudaHistoricaSbService.findAll(+idEqfx);
	}
}