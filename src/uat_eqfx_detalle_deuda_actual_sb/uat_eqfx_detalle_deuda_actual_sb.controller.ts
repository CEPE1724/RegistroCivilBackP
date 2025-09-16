import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxDetalleDeudaActualSbService } from './uat_eqfx_detalle_deuda_actual_sb.service';


@Controller('uatEqfxDetalleDeudaActualSb')
export class UatEqfxDetalleDeudaActualSbController {
	constructor(private readonly uatEqfxDetalleDeudaActualSbService: UatEqfxDetalleDeudaActualSbService) { }

	@Get(':idEqfx')
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxDetalleDeudaActualSbService.findAll(+idEqfx);
	}
}
