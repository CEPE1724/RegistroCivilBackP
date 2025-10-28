import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxDetalleDeudaHistoricaSicomService } from './uat_eqfx_detalle_deuda_historica_sicom.service';

@Controller('uatEqfxDetalleDeudaHistoricaSicom')
export class UatEqfxDetalleDeudaHistoricaSicomController {
	constructor(private readonly uatEqfxDetalleDeudaHistoricaSicomService: UatEqfxDetalleDeudaHistoricaSicomService) { }


	@Get(':idEqfx')
	findAll(@Param('idEqfx') idEqfx: string) {
		return this.uatEqfxDetalleDeudaHistoricaSicomService.findAll(+idEqfx);
	}
}
