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

  @Post('Nueva-solicitud-web')
  @Auth()
  createNuevaSolicitud(@Body() createCreSolicitudWebDto: CreateCreSolicitudWebDto) {

    return this.creSolicitudWebService.createnuevasolicitud(createCreSolicitudWebDto);
  }

  @Post('')
  @Auth()
  create(@Body() createCreSolicitudWebDto: CreateCreSolicitudWebDto) {

    return this.creSolicitudWebService.create(createCreSolicitudWebDto);
  }

  /* para el eccommerce*/
  @Post('web')
  createweb(@Body() createCreSolicitudWebDto: CreateCreSolicitudWebDto) {

    return this.creSolicitudWebService.create(createCreSolicitudWebDto);
  }

  @Get('verificar-cedula-bodega')
  @Auth()
  async verificarCedulaBodega(
    @Query('cedula') cedula: string
  ): Promise<{ existe: boolean, solicitud: object }> {
    return this.creSolicitudWebService.verificarCedulaBodega(cedula);
  }


  @Get('prueba')
  @Auth()
  @UseGuards(AuthGuard())
  getPrueba() {

    return { message: 'Prueba OK' };
  }
  /*
  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto, @Query('bodega') bodega: number[]) {
    return this.creSolicitudWebService.findAll(paginationDto, bodega);
  }*/

  @Post('all-cresolicitudweb')
  @Auth()
  findAllCreSolicitudWeb(
    @Body() paginationDto: PaginationDto,
    @Query('bodega') queryBodega: number[]
  ) {
    let bodega = queryBodega ?? paginationDto.bodega;

    // 2. Normalizar: si es número -> convertirlo a array
    if (!Array.isArray(bodega)) {
      bodega = [bodega];
    }

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
  async update(@Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number,
    @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    @GetUser() usuarioEjecutor: any) {
    return this.creSolicitudWebService.update(idCre_SolicitudWeb, updateCreSolicitudWebDto, usuarioEjecutor);
  }

  @Patch('updatetelefonica/:idCre_SolicitudWeb/:idEstadoVerificacionDocumental')
  @Auth()
  async updateTelefonica(
    @Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number,
    @Param('idEstadoVerificacionDocumental') idEstadoVerificacionDocumental: number,
    @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    @GetUser() usuarioEjecutor: any,

  ) {
    return this.creSolicitudWebService.updateTelefonica(idCre_SolicitudWeb, idEstadoVerificacionDocumental, updateCreSolicitudWebDto, usuarioEjecutor);

  }

  @Patch('updatetelefonicaEstados/:idCre_SolicitudWeb')
  @Auth()
  async updateSolicitud(
    @Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number,
    @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    @GetUser() usuarioEjecutor: any,
  ) {

    return this.creSolicitudWebService.updateSolicitud(idCre_SolicitudWeb, updateCreSolicitudWebDto, usuarioEjecutor);
  }

  @Patch('updatecodDactilar/:idCre_SolicitudWeb')
  @Auth()
  async updateCodDactilar(
    @Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number,

    @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    @GetUser() usuarioEjecutor: any,) {
    return this.creSolicitudWebService.updateCodDactilar(idCre_SolicitudWeb, updateCreSolicitudWebDto, usuarioEjecutor);

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

  @Get('MotivoContinuidad/:Vendedor')
  //@Auth()
  async getMotivoContinuidad(@Param('Vendedor') Vendedor: number) {
    return await this.creSolicitudWebService.getMotivoContinuidad(Vendedor);
  }

  @Get('procesarDatosCogno/:Cedula')
  async procesarDatosCogno(@Param('Cedula') Cedula: string) {
    return await this.creSolicitudWebService.procesarDatosCogno(Cedula);
  }

  // 📊 ENDPOINT PARA CONSULTAR ESTADO DE SOLICITUD
  @Get('estado/:idSolicitud')
  async obtenerEstadoSolicitud(@Param('idSolicitud') idSolicitud: number) {
    return await this.creSolicitudWebService.obtenerEstadoProceso(idSolicitud);
  }

  // 📊 ENDPOINT PARA CONSULTAR ESTADO POR CÉDULA
  @Get('estado/cedula/:cedula')
  async obtenerEstadoPorCedula(@Param('cedula') cedula: string) {
    return await this.creSolicitudWebService.obtenerEstadoPorCedula(cedula);
  }

  // 📊 ENDPOINT PARA OBTENER HISTORIAL COMPLETO DE ESTADO
  @Get('historial/:idSolicitud')
  async obtenerHistorialProceso(@Param('idSolicitud') idSolicitud: number) {
    return await this.creSolicitudWebService.obtenerHistorialProceso(idSolicitud);
  }

}
