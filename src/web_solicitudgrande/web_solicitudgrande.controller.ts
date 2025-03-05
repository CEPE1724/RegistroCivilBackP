import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebSolicitudgrandeService } from './web_solicitudgrande.service';
import { CreateWebSolicitudgrandeDto } from './dto/create-web_solicitudgrande.dto';
import { UpdateWebSolicitudgrandeDto } from './dto/update-web_solicitudgrande.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webSolicitudgrandeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebSolicitudgrandeDto: UpdateWebSolicitudgrandeDto) {
    return this.webSolicitudgrandeService.update(+id, updateWebSolicitudgrandeDto);
  }
}
