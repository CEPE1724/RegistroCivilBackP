import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { CreSolicitudWebService } from './cre_solicitud-web.service';
import { CreateCreSolicitudWebDto } from './dto/create-cre_solicitud-web.dto';
import { UpdateCreSolicitudWebDto } from './dto/update-cre_solicitud-web.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FilterCreSolicitudWebDto } from './dto/filter-cre-solicitud-web.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('cre-solicitud-web')
export class CreSolicitudWebController {
  constructor(private readonly creSolicitudWebService: CreSolicitudWebService) { }

  @Post()
  create(@Body() createCreSolicitudWebDto: CreateCreSolicitudWebDto) {

    return this.creSolicitudWebService.create(createCreSolicitudWebDto);
  }
  @Get('prueba')
  @UseGuards(AuthGuard())
  getPrueba() {

    return { message: 'Prueba OK' };
  }
  @Get()
  findAll(@Query() paginationDto: PaginationDto, @Query('bodega') bodega: number[]) {
    return this.creSolicitudWebService.findAll(paginationDto, bodega);
    
  }

  @Get('documentosanalista')
  findAllFilter(@Query() filterCreSolicitudWebDto: FilterCreSolicitudWebDto) {
    return this.creSolicitudWebService.findAllFilter(filterCreSolicitudWebDto);
  }

  @Get('repositorios')
  async getrepositorios(
    @Query('anio') anio?: string,
    @Query('mes') mes?: string,
  ) {

    const anioParsed = anio ? parseInt(anio, 10) : undefined;
    const mesParsed = mes ? parseInt(mes, 10) : undefined;
    return await this.creSolicitudWebService.getSolicitudesWebRepositorio(anioParsed, mesParsed);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creSolicitudWebService.findOne(+id);
  }

  @Put(':idCre_SolicitudWeb')
  async update(@Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number, @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto) {
    return this.creSolicitudWebService.update(idCre_SolicitudWeb, updateCreSolicitudWebDto);
  }

  @Patch('updatetelefonica/:idCre_SolicitudWeb/:idEstadoVerificacionDocumental')
  async updateTelefonica(
    @Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number, 
    @Param('idEstadoVerificacionDocumental') idEstadoVerificacionDocumental: number,
    @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto) {
    return this.creSolicitudWebService.updateTelefonica(idCre_SolicitudWeb, idEstadoVerificacionDocumental, updateCreSolicitudWebDto);
  }

  @Patch('updatetelefonicaEstados/:idCre_SolicitudWeb')

  async updateSolicitud(
    @Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number,
    
   @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto , 
  ) 
   {

   return this.creSolicitudWebService.updateSolicitud(idCre_SolicitudWeb, updateCreSolicitudWebDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creSolicitudWebService.remove(+id);
  }

  @Get('solicitud-Cogno/:Cedula')
  async getSolicitudCogno(@Param('Cedula') Cedula: string) {
    return await this.creSolicitudWebService.getSolicitudCogno(Cedula);
  }
}
