import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreSolicitudverificaciontelefonicaService } from './cre-solicitudverificaciontelefonica.service';
import { CreateCreSolicitudverificaciontelefonicaDto } from './dto/create-cre-solicitudverificaciontelefonica.dto';
import { UpdateCreSolicitudverificaciontelefonicaDto } from './dto/update-cre-solicitudverificaciontelefonica.dto';

@Controller('cre-solicitudverificaciontelefonica')
export class CreSolicitudverificaciontelefonicaController {
  constructor(private readonly creSolicitudverificaciontelefonicaService: CreSolicitudverificaciontelefonicaService) {}

  @Post()
  create(@Body() createCreSolicitudverificaciontelefonicaDto: CreateCreSolicitudverificaciontelefonicaDto) {
    return this.creSolicitudverificaciontelefonicaService.create(createCreSolicitudverificaciontelefonicaDto);
  }
  
  @Get()
  findAll() {
    return this.creSolicitudverificaciontelefonicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creSolicitudverificaciontelefonicaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreSolicitudverificaciontelefonicaDto: UpdateCreSolicitudverificaciontelefonicaDto) {
    return this.creSolicitudverificaciontelefonicaService.update(+id, updateCreSolicitudverificaciontelefonicaDto);
  }

}
