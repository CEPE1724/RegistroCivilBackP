import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientesVerificacionTerrenaService } from './clientes-verificacion-terrena.service';
import { CreateClientesVerificacionTerrenaDto } from './dto/create-clientes-verificacion-terrena.dto';
import { UpdateClientesVerificacionTerrenaDto } from './dto/update-clientes-verificacion-terrena.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

interface VerificacionBasicaInput {
	idCre_solicitud?: number;
	idVerificador?: number;
	bDomicilio?: boolean;
	bTrabajo?: boolean;
	Usuario?: string;
  }

@Controller('clientes-verificacion-terrena')
export class ClientesVerificacionTerrenaController {
  constructor(private readonly clientesVerificacionTerrenaService: ClientesVerificacionTerrenaService) {}

  @Post()
  @Auth()
  create(@Body() createClientesVerificacionTerrenaDto: CreateClientesVerificacionTerrenaDto) {
	
    return this.clientesVerificacionTerrenaService.create(createClientesVerificacionTerrenaDto);
  }
  
  @Post('basica')
  @Auth()
  createVerificacionBasica(@Body() body: VerificacionBasicaInput) {
	return this.clientesVerificacionTerrenaService.createVerificacionBasica(body);
  }
  
  @Get('allbyID/:id')
  @Auth()
  findAll(
	@Param('id') idCre_Solicitud: number,
	@Query('tipo') tipo: 'domicilio' | 'trabajo'
) {
    return this.clientesVerificacionTerrenaService.findAll(idCre_Solicitud, tipo);
  }

  @Get('coordInforme/:id')
  @Auth()
  findAllFiltrados(@Param('id') id: number) {
	return this.clientesVerificacionTerrenaService.findAllFilter(id);
  }

  @Get(':id/:Tipo')
  @Auth()
  findOne(@Param('id') id: number, @Param('Tipo') Tipo: number) {
    return this.clientesVerificacionTerrenaService.findOne(id, Tipo);
  }

  @Patch('update/:id')
  @Auth()
  update(@Param('id') id: number, @Body() updateClientesVerificacionTerrenaDto: UpdateClientesVerificacionTerrenaDto) {
    return this.clientesVerificacionTerrenaService.update(+id, updateClientesVerificacionTerrenaDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.clientesVerificacionTerrenaService.remove(+id);
  }

  
}