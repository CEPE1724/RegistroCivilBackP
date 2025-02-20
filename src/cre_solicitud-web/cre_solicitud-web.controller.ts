import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreSolicitudWebService } from './cre_solicitud-web.service';
import { CreateCreSolicitudWebDto } from './dto/create-cre_solicitud-web.dto';
import { UpdateCreSolicitudWebDto } from './dto/update-cre_solicitud-web.dto';

@Controller('cre-solicitud-web')
export class CreSolicitudWebController {
  constructor(private readonly creSolicitudWebService: CreSolicitudWebService) {}

  @Post()
  create(@Body() createCreSolicitudWebDto: CreateCreSolicitudWebDto) {
    return this.creSolicitudWebService.create(createCreSolicitudWebDto);
  }

  @Get()
  findAll() {
    return this.creSolicitudWebService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creSolicitudWebService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreSolicitudWebDto: UpdateCreSolicitudWebDto) {
    return this.creSolicitudWebService.update(+id, updateCreSolicitudWebDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creSolicitudWebService.remove(+id);
  }
}
