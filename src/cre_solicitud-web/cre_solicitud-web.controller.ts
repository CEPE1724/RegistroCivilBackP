import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { CreSolicitudWebService } from './cre_solicitud-web.service';
import { CreateCreSolicitudWebDto } from './dto/create-cre_solicitud-web.dto';
import { UpdateCreSolicitudWebDto } from './dto/update-cre_solicitud-web.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FilterCreSolicitudWebDto } from './dto/filter-cre-solicitud-web.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-solicitud-web')
export class CreSolicitudWebController {
  constructor(private readonly creSolicitudWebService: CreSolicitudWebService) { }

  @Post()
  @Auth()
  create(@Body() createCreSolicitudWebDto: CreateCreSolicitudWebDto) {

    return this.creSolicitudWebService.create(createCreSolicitudWebDto);
  }
  
    @Get('verificar-cedula-bodega')
@Auth()
async verificarCedulaBodega(
  @Query('cedula') cedula: string,
  @Query('bodega') bodega: number,
): Promise<{ existe: boolean }> {
  return this.creSolicitudWebService.verificarCedulaBodega(cedula, bodega);
}


  @Get('prueba')
  @Auth()
  @UseGuards(AuthGuard())
  getPrueba() {

    return { message: 'Prueba OK' };
  }
  @Get()
  @Auth()                 
  @Auth()
  findAll(@Query() paginationDto: PaginationDto, @Query('bodega') bodega: number[]) {
    return this.creSolicitudWebService.findAll(paginationDto, bodega);
    
  }

  @Get('documentosanalista')
  @Auth()
  findAllFilter(@Query() filterCreSolicitudWebDto: FilterCreSolicitudWebDto) {
    return this.creSolicitudWebService.findAllFilter(filterCreSolicitudWebDto);
  }

  @Get('repositorios')
  @Auth()
  async getrepositorios(
    @Query('anio') anio?: string,
    @Query('mes') mes?: string,
  ) {

    const anioParsed = anio ? parseInt(anio, 10) : undefined;
    const mesParsed = mes ? parseInt(mes, 10) : undefined;
    return await this.creSolicitudWebService.getSolicitudesWebRepositorio(anioParsed, mesParsed);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.creSolicitudWebService.findOne(+id);
  }

  @Put(':idCre_SolicitudWeb')
  @Auth()
  async update(@Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number, @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto) {
    return this.creSolicitudWebService.update(idCre_SolicitudWeb, updateCreSolicitudWebDto);
  }

  @Patch('updatetelefonica/:idCre_SolicitudWeb/:idEstadoVerificacionDocumental')
  @Auth()
  async updateTelefonica(
    @Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number, 
    @Param('idEstadoVerificacionDocumental') idEstadoVerificacionDocumental: number,
    @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    @GetUser() usuarioEjecutor: any,
) {
    return this.creSolicitudWebService.updateTelefonica(idCre_SolicitudWeb, idEstadoVerificacionDocumental, updateCreSolicitudWebDto , usuarioEjecutor);
  }

  @Patch('updatetelefonicaEstados/:idCre_SolicitudWeb')
  @Auth()
  async updateSolicitud(
    @Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number,
   @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto ,
    @GetUser() usuarioEjecutor: any,
  ) 
   {

   return this.creSolicitudWebService.updateSolicitud(idCre_SolicitudWeb, updateCreSolicitudWebDto , usuarioEjecutor);
  }

  @Patch('updatecodDactilar/:idCre_SolicitudWeb')
  @Auth()
  async updateCodDactilar(
    @Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number,
    @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto , 
    @GetUser() usuarioEjecutor: any,) {
    return this.creSolicitudWebService.updateCodDactilar(idCre_SolicitudWeb, updateCreSolicitudWebDto , usuarioEjecutor);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.creSolicitudWebService.remove(+id);
  }

  @Get('solicitud-Cogno/:Cedula')
  @Auth()
  async getSolicitudCogno(@Param('Cedula') Cedula: string) {
    return await this.creSolicitudWebService.getSolicitudCogno(Cedula);
  } 

 
}
