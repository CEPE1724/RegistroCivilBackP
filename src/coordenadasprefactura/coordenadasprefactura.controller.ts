import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CoordenadasprefacturaService } from './coordenadasprefactura.service';
import { CreateCoordenadasprefacturaDto } from './dto/create-coordenadasprefactura.dto';
import { UpdateCoordenadasprefacturaDto } from './dto/update-coordenadasprefactura.dto';
import { PaginationGeoreferenciaDto } from 'src/common/dtos/paginationgeoreferencia.dto';
@Controller('coordenadasprefactura')
export class CoordenadasprefacturaController {
  constructor(private readonly coordenadasprefacturaService: CoordenadasprefacturaService) {}

  @Get('all')
  findAll(@Query() paginationGeoreferenciaDto: PaginationGeoreferenciaDto) {
    return this.coordenadasprefacturaService.findAll(paginationGeoreferenciaDto);
  }

  @Post('insert')
  async insert(
    @Body() createCoordenadasPrefacturaDto: CreateCoordenadasprefacturaDto,
  ) {
    if (createCoordenadasPrefacturaDto.iEstado == null) {
      createCoordenadasPrefacturaDto.iEstado = 0;
    }
    
    if (!createCoordenadasPrefacturaDto.FechaSistema) {
      createCoordenadasPrefacturaDto.FechaSistema = new Date();
    }
	
    return await this.coordenadasprefacturaService.create(
      createCoordenadasPrefacturaDto,
    );
  }

}

