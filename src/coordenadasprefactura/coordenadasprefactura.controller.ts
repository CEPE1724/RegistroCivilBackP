import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CoordenadasprefacturaService } from './coordenadasprefactura.service';
import { CreateCoordenadasprefacturaDto } from './dto/create-coordenadasprefactura.dto';
import { UpdateCoordenadasprefacturaDto } from './dto/update-coordenadasprefactura.dto';
import { PaginationGeoreferenciaDto } from 'src/common/dtos/paginationgeoreferencia.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { number } from 'joi';

@Controller('coordenadasprefactura')
export class CoordenadasprefacturaController {
  constructor(private readonly coordenadasprefacturaService: CoordenadasprefacturaService) {}

  @Get('all')
  @Auth()
  findAll(@Query() paginationGeoreferenciaDto: PaginationGeoreferenciaDto) {
    return this.coordenadasprefacturaService.findAll(paginationGeoreferenciaDto);
  }

  @Get('find/:id/:Tipo')
  @Auth()
  findOne(
    @Param('id') id: number,
    @Param('Tipo') Tipo: number,
  ) {
    return this.coordenadasprefacturaService.existsAndCount(id, Tipo);
  }

  @Post('insert')
  @Auth()
  async insert(
    @Body() createCoordenadasPrefacturaDto: CreateCoordenadasprefacturaDto,
  ) {
    return await this.coordenadasprefacturaService.create(
      createCoordenadasPrefacturaDto,
    );
  }


  @Get('id/:id/:tipo')
  @Auth()
  findOneId(@Param('id') id: number, @Param('tipo') tipo: number) {
	return this.coordenadasprefacturaService.findAllbyId(id, tipo)
  }
}

