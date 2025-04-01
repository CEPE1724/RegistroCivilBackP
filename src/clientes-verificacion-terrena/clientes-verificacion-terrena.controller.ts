import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ClientesVerificacionTerrenaService } from './clientes-verificacion-terrena.service';
import { CreateClientesVerificacionTerrenaDto } from './dto/create-clientes-verificacion-terrena.dto';
import { UpdateClientesVerificacionTerrenaDto } from './dto/update-clientes-verificacion-terrena.dto';

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
  create(@Body() createClientesVerificacionTerrenaDto: CreateClientesVerificacionTerrenaDto) {
	
    return this.clientesVerificacionTerrenaService.create(createClientesVerificacionTerrenaDto);
  }
  
  @Post('basica')
  createVerificacionBasica(@Body() body: VerificacionBasicaInput) {
	return this.clientesVerificacionTerrenaService.createVerificacionBasica(body);
  }
  
  @Get()
  findAll() {
    return this.clientesVerificacionTerrenaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesVerificacionTerrenaService.findOne(+id);
  }

  @Get('domicilio/:id')
async getDomicilioPorSolicitud(@Param('id') id: string) {
  const idCreSolicitud = parseInt(id, 10);

  if (isNaN(idCreSolicitud)) {
    throw new BadRequestException('El ID debe ser un número');
  }

  return this.clientesVerificacionTerrenaService.getGestionDomicilioPorSolicitud(idCreSolicitud);
}


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientesVerificacionTerrenaDto: UpdateClientesVerificacionTerrenaDto) {
    return this.clientesVerificacionTerrenaService.update(+id, updateClientesVerificacionTerrenaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesVerificacionTerrenaService.remove(+id);
  }

  
}
