import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreSolicitudverificaciontelefonicaService } from './cre-solicitudverificaciontelefonica.service';
import { CreateCreSolicitudverificaciontelefonicaDto } from './dto/create-cre-solicitudverificaciontelefonica.dto';
import { UpdateCreSolicitudverificaciontelefonicaDto } from './dto/update-cre-solicitudverificaciontelefonica.dto';
import { Query } from '@nestjs/common';

@Controller('cre-solicitudverificaciontelefonica')
export class CreSolicitudverificaciontelefonicaController {
  constructor(private readonly creSolicitudverificaciontelefonicaService: CreSolicitudverificaciontelefonicaService) {}


  @Post()
  create(@Body() createCreSolicitudverificaciontelefonicaDto: CreateCreSolicitudverificaciontelefonicaDto) {
    return this.creSolicitudverificaciontelefonicaService.create(createCreSolicitudverificaciontelefonicaDto);
  }
  





  @Get('search')
  search(
    @Query('idCre_SolicitudWeb') idCre_SolicitudWeb: number, 
    @Query('idCre_VerificacionTelefonicaMaestro') idCre_VerificacionTelefonicaMaestro: number
  ) {
    return this.creSolicitudverificaciontelefonicaService.search(idCre_SolicitudWeb, idCre_VerificacionTelefonicaMaestro);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreSolicitudverificaciontelefonicaDto: UpdateCreSolicitudverificaciontelefonicaDto) {
    return this.creSolicitudverificaciontelefonicaService.update(+id, updateCreSolicitudverificaciontelefonicaDto);
  }

}
