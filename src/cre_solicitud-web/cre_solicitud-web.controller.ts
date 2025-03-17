import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { CreSolicitudWebService } from './cre_solicitud-web.service';
import { CreateCreSolicitudWebDto } from './dto/create-cre_solicitud-web.dto';
import { UpdateCreSolicitudWebDto } from './dto/update-cre_solicitud-web.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('cre-solicitud-web')
export class CreSolicitudWebController {
  constructor(private readonly creSolicitudWebService: CreSolicitudWebService) {}

  @Post()
  create(@Body() createCreSolicitudWebDto: CreateCreSolicitudWebDto) {
    return this.creSolicitudWebService.create(createCreSolicitudWebDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.creSolicitudWebService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creSolicitudWebService.findOne(+id);
  }

  @Get('repositorios')
  async getrepositorios(
    @Query('anio') anio?: string,
    @Query('mes') mes?: string,
  ) {
	console.log('repositorios');
    const anioParsed = anio ? parseInt(anio, 10) : undefined;
    const mesParsed = mes ? parseInt(mes, 10) : undefined;
    return await this.creSolicitudWebService.getSolicitudesWebRepositorio(anioParsed, mesParsed);
  }

  @Put(':idCre_SolicitudWeb')
  async update(@Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number, @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto) {
    return this.creSolicitudWebService.update(idCre_SolicitudWeb, updateCreSolicitudWebDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creSolicitudWebService.remove(+id);
  }
}
