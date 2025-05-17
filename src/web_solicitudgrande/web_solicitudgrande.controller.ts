import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { WebSolicitudgrandeService } from './web_solicitudgrande.service';
import { CreateWebSolicitudgrandeDto } from './dto/create-web_solicitudgrande.dto';
import { UpdateWebSolicitudgrandeDto } from './dto/update-web_solicitudgrande.dto';
import { UpdateCuotaYCupoDto } from './dto/update-web_solicitudgrande.dto';
import { Auth } from 'src/auth/decorators';

@Controller('web-solicitudgrande')
export class WebSolicitudgrandeController {
  constructor(private readonly webSolicitudgrandeService: WebSolicitudgrandeService) {}

  @Post()
  @Auth()
  create(@Body() createWebSolicitudgrandeDto: CreateWebSolicitudgrandeDto) {
    return this.webSolicitudgrandeService.create(createWebSolicitudgrandeDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.webSolicitudgrandeService.findAll();
  }

  @Get(':id/:numerosolicitud')
  @Auth()
  findOne(@Param('id') id: string, @Param('numerosolicitud') numerosolicitud: string) {
    return this.webSolicitudgrandeService.findOne(+id, numerosolicitud);
  }

  @Patch('listadosolicitud/:id')
  @Auth()
  update(@Param('id') id: string, @Body() updateWebSolicitudgrandeDto: UpdateWebSolicitudgrandeDto) {
    return this.webSolicitudgrandeService.update(id, updateWebSolicitudgrandeDto);
  }

@Patch('updatecuotaycupo/:id')
@Auth()
updateCuotayCupo(@Param('id') id: string, @Body() updateDto: UpdateCuotaYCupoDto) {
  const idNumber = id

  // string valido o qu eno venga vacio
  if (!idNumber ) {
    throw new BadRequestException('El id proporcionado no es válido.');
  }
  

  return this.webSolicitudgrandeService.updateCuotayCupo(idNumber, updateDto);
  }
}
