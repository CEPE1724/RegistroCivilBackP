import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTipocontratoService } from './cre_tipocontrato.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-tipocontrato')
export class CreTipocontratoController {
	constructor(private readonly creTipocontratoService: CreTipocontratoService) { }

	@Get()
	@Auth()
	findAll() {
		return this.creTipocontratoService.findAll();
	}

}
