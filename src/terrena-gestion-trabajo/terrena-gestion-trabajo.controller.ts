import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerrenaGestionTrabajoService } from './terrena-gestion-trabajo.service';
import { CreateTerrenaGestionTrabajoDto } from './dto/create-terrena-gestion-trabajo.dto';
import { UpdateTerrenaGestionTrabajoDto } from './dto/update-terrena-gestion-trabajo.dto';
import { Auth } from 'src/auth/decorators';

@Controller('terrena-gestion-trabajo')
export class TerrenaGestionTrabajoController {
  constructor(private readonly terrenaGestionTrabajoService: TerrenaGestionTrabajoService) {}


  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: number) {
    return this.terrenaGestionTrabajoService.findOne(+id);
  }

  @Patch('/tipo-verificacion/:id')
  @Auth()
  async updateTipoVerificacion(
	@Param('id') id: number, 
	@Body() {tipoVerificacion}: {tipoVerificacion: number}) {
	return this.terrenaGestionTrabajoService.updateTipoVerificacion(+id, +tipoVerificacion);
  }


}
