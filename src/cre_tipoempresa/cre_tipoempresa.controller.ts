import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreTipoempresaService } from './cre_tipoempresa.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-tipoempresa')
export class CreTipoempresaController {
	constructor(private readonly creTipoempresaService: CreTipoempresaService) { }

	@Get()
	@Auth()
	findAll() {
		return this.creTipoempresaService.findAll();
	}

}
