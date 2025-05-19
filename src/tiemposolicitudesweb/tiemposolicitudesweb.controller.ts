import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiemposolicitudeswebService } from './tiemposolicitudesweb.service';
import { CreateTiemposolicitudeswebDto } from './dto/create-tiemposolicitudesweb.dto';
import { UpdateTiemposolicitudeswebDto } from './dto/update-tiemposolicitudesweb.dto';
import { Auth } from 'src/auth/decorators';

@Controller('tiemposolicitudesweb')
export class TiemposolicitudeswebController {
  constructor(private readonly tiemposolicitudeswebService: TiemposolicitudeswebService) {}

  @Post()
  @Auth()
  create(@Body() createTiemposolicitudeswebDto: CreateTiemposolicitudeswebDto) {
    return this.tiemposolicitudeswebService.create(createTiemposolicitudeswebDto);
  }

  @Get('all/:idCre_SolicitudWeb')
  @Auth()
  findAll(@Param('idCre_SolicitudWeb') idCre_SolicitudWeb: string) {
    return this.tiemposolicitudeswebService.findAll(idCre_SolicitudWeb);
  }

  @Get('all/estado/:idCre_SolicitudWeb/:tipo')
  @Auth()
  findAllEstado(@Param('idCre_SolicitudWeb') idCre_SolicitudWeb: string,
  @Param('tipo') tipo: number) {
    return this.tiemposolicitudeswebService.findAllTipo(idCre_SolicitudWeb, tipo);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.tiemposolicitudeswebService.findOne(+id);
  }

  @Get('tiempo/:tipo/:idCre_SolicitudWeb/:idEstadoVerificacionDocumental')
  @Auth()
  findAllTiempo(@Param('tipo') tipo: number,
  @Param('idCre_SolicitudWeb') idCre_SolicitudWeb: string,
  @Param('idEstadoVerificacionDocumental') idEstadoVerificacionDocumental: string) {
    const idEstados = idEstadoVerificacionDocumental.split(',').map(id => parseInt(id));

    return this.tiemposolicitudeswebService.findAllTiempo(tipo, idCre_SolicitudWeb, idEstados);
  }

}
