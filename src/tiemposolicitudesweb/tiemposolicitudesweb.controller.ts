import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiemposolicitudeswebService } from './tiemposolicitudesweb.service';
import { CreateTiemposolicitudeswebDto } from './dto/create-tiemposolicitudesweb.dto';
import { UpdateTiemposolicitudeswebDto } from './dto/update-tiemposolicitudesweb.dto';

@Controller('tiemposolicitudesweb')
export class TiemposolicitudeswebController {
  constructor(private readonly tiemposolicitudeswebService: TiemposolicitudeswebService) {}

  @Post()
  create(@Body() createTiemposolicitudeswebDto: CreateTiemposolicitudeswebDto) {
    return this.tiemposolicitudeswebService.create(createTiemposolicitudeswebDto);
  }

  @Get('all/:idCre_SolicitudWeb')
  findAll(@Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number) {
    return this.tiemposolicitudeswebService.findAll(idCre_SolicitudWeb);
  }

  @Get('all/estado/:idCre_SolicitudWeb/:tipo')
  findAllEstado(@Param('idCre_SolicitudWeb') idCre_SolicitudWeb: number,
  @Param('tipo') tipo: number) {
    return this.tiemposolicitudeswebService.findAllTipo(idCre_SolicitudWeb, tipo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiemposolicitudeswebService.findOne(+id);
  }


}
