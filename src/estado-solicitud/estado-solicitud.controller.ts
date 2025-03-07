import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoSolicitudService } from './estado-solicitud.service';
import { CreateEstadoSolicitudDto } from './dto/create-estado-solicitud.dto';
import { UpdateEstadoSolicitudDto } from './dto/update-estado-solicitud.dto';

@Controller('estado-solicitud')
export class EstadoSolicitudController {
  constructor(private readonly estadoSolicitudService: EstadoSolicitudService) {}

  @Get(':idEstado')
  async findByEstado(@Param('idEstado') idEstado: string) {
    return await this.estadoSolicitudService.finByEstado(Number(idEstado));
  }

}
