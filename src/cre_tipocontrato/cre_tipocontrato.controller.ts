import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTipocontratoService } from './cre_tipocontrato.service';

@Controller('cre-tipocontrato')
export class CreTipocontratoController {
	constructor(private readonly creTipocontratoService: CreTipocontratoService) { }

	@Get()
	findAll() {
		return this.creTipocontratoService.findAll();
	}

}
