import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { WebSolicitudgrandeService } from './web_solicitudgrande.service';
import { CreateWebSolicitudgrandeDto } from './dto/create-web_solicitudgrande.dto';
import { UpdateWebSolicitudgrandeDto } from './dto/update-web_solicitudgrande.dto';
import { UpdateCuotaYCupoDto } from './dto/update-web_solicitudgrande.dto';

@Controller('web-solicitudgrande')
export class WebSolicitudgrandeController {
  constructor(private readonly webSolicitudgrandeService: WebSolicitudgrandeService) {}

  @Post()
  create(@Body() createWebSolicitudgrandeDto: CreateWebSolicitudgrandeDto) {
    return this.webSolicitudgrandeService.create(createWebSolicitudgrandeDto);
  }

  @Get()
  findAll() {
    return this.webSolicitudgrandeService.findAll();
  }

  @Get(':id/:numerosolicitud')
  findOne(@Param('id') id: string, @Param('numerosolicitud') numerosolicitud: string) {
    return this.webSolicitudgrandeService.findOne(+id, numerosolicitud);
  }

  @Patch('listadosolicitud/:id')
  update(@Param('id') id: string, @Body() updateWebSolicitudgrandeDto: UpdateWebSolicitudgrandeDto) {
    return this.webSolicitudgrandeService.update(+id, updateWebSolicitudgrandeDto);
  }

@Patch('updatecuotaycupo/:id')
updateCuotayCupo(@Param('id') id: string, @Body() updateDto: UpdateCuotaYCupoDto) {
  const idNumber = parseInt(id, 10);
  if (isNaN(idNumber)) {
    throw new BadRequestException('ID debe ser un número válido');
  }

  return this.webSolicitudgrandeService.updateCuotayCupo(idNumber, updateDto);
  }
}
