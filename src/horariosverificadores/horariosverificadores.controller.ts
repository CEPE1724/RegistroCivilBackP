import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
  } from '@nestjs/common';
  import { HorariosverificadoresService } from './horariosverificadores.service';
  import { CreateHorariosverificadoresDto } from './dto/create-horariosverificadores.dto';
  import { UpdateHorariosverificadoresDto } from './dto/update-horariosverificadores.dto';
  import { Auth } from 'src/auth/decorators';
  
  @Controller('horariosverificadores')
  export class HorariosverificadoresController {
	constructor(
	  private readonly horariosverificadoresService: HorariosverificadoresService,
	) {}
  
	@Post()
	@Auth()
	create(@Body() createDto: CreateHorariosverificadoresDto) {
	  return this.horariosverificadoresService.create(createDto);
	}
  
	@Get()
	@Auth()
	findAll() {
	  return this.horariosverificadoresService.findAll();
	}
  
	@Get(':id')
	@Auth()
	findOne(@Param('id', ParseIntPipe) id: number) {
	  return this.horariosverificadoresService.findOne(id);
	}
  
	@Get('verificador/:idVerificadorCredito/fecha/:idFechaVerificador')
	@Auth()
	async getFechaVerificador(
	  @Param('idVerificadorCredito', ParseIntPipe) idVerificadorCredito: number,
	  @Param('idFechaVerificador', ParseIntPipe) idFechaVerificador: number,
	): Promise<any> {
	  return await this.horariosverificadoresService.getFechaVerificador(
		idVerificadorCredito,
		idFechaVerificador,
	  );
	}
  
	@Patch(':id')
	@Auth()
	update(
	  @Param('id', ParseIntPipe) id: number,
	  @Body() updateDto: UpdateHorariosverificadoresDto,
	) {
	  return this.horariosverificadoresService.update(id, updateDto);
	}
  
	@Delete(':id')
	@Auth()
	remove(@Param('id', ParseIntPipe) id: number) {
	  return this.horariosverificadoresService.remove(id);
	}
  }
  