import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxDetalleDeudaActualSicomService } from './uat_eqfx_detalle_deuda_actual_sicom.service';

@Controller('uatEqfxDetalleDeudaActualSicom')
export class UatEqfxDetalleDeudaActualSicomController {
	constructor(private readonly uatEqfxDetalleDeudaActualSicomService: UatEqfxDetalleDeudaActualSicomService) { }


	@Get(':idEqfx')
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxDetalleDeudaActualSicomService.findAll(+idEqfx);
	}

}