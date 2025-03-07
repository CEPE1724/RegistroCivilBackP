import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTipoempresaService } from './cre_tipoempresa.service';

@Controller('cre-tipoempresa')
export class CreTipoempresaController {
	constructor(private readonly creTipoempresaService: CreTipoempresaService) { }

	@Get()
	findAll() {
		return this.creTipoempresaService.findAll();
	}

}
