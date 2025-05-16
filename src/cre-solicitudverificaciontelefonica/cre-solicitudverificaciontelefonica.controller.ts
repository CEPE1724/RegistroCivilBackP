import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreSolicitudverificaciontelefonicaService } from './cre-solicitudverificaciontelefonica.service';
import { CreateCreSolicitudverificaciontelefonicaDto } from './dto/create-cre-solicitudverificaciontelefonica.dto';
import { UpdateCreSolicitudverificaciontelefonicaDto } from './dto/update-cre-solicitudverificaciontelefonica.dto';
import { Query } from '@nestjs/common';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-solicitudverificaciontelefonica')
export class CreSolicitudverificaciontelefonicaController {
  constructor(private readonly creSolicitudverificaciontelefonicaService: CreSolicitudverificaciontelefonicaService) {}


  @Post()
  @Auth()
  create(@Body() createCreSolicitudverificaciontelefonicaDto: CreateCreSolicitudverificaciontelefonicaDto) {
    return this.creSolicitudverificaciontelefonicaService.create(createCreSolicitudverificaciontelefonicaDto);
  }
  





  @Get('search')
  @Auth()
  search(
    @Query('idCre_SolicitudWeb') idCre_SolicitudWeb: string, 
    @Query('idCre_VerificacionTelefonicaMaestro') idCre_VerificacionTelefonicaMaestro: number
  ) {
    return this.creSolicitudverificaciontelefonicaService.search(idCre_SolicitudWeb, idCre_VerificacionTelefonicaMaestro);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateCreSolicitudverificaciontelefonicaDto: UpdateCreSolicitudverificaciontelefonicaDto) {
    return this.creSolicitudverificaciontelefonicaService.update(+id, updateCreSolicitudverificaciontelefonicaDto);
  }

}
