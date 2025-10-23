import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeoreferenciaEntregaDomicilioService } from './georeferencia-entrega-domicilio.service';
import { CreateGeoreferenciaEntregaDomicilioDto } from './dto/create-georeferencia-entrega-domicilio.dto';
import { UpdateGeoreferenciaEntregaDomicilioDto } from './dto/update-georeferencia-entrega-domicilio.dto';

@Controller('georeferencia-entrega-domicilio')
export class GeoreferenciaEntregaDomicilioController {
  constructor(private readonly georeferenciaEntregaDomicilioService: GeoreferenciaEntregaDomicilioService) {}

  @Post()
  create(@Body() createGeoreferenciaEntregaDomicilioDto: CreateGeoreferenciaEntregaDomicilioDto) {
    return this.georeferenciaEntregaDomicilioService.create(createGeoreferenciaEntregaDomicilioDto);
  }

  @Get()
  findAll() {
    return this.georeferenciaEntregaDomicilioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.georeferenciaEntregaDomicilioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeoreferenciaEntregaDomicilioDto: UpdateGeoreferenciaEntregaDomicilioDto) {
    return this.georeferenciaEntregaDomicilioService.update(+id, updateGeoreferenciaEntregaDomicilioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.georeferenciaEntregaDomicilioService.remove(+id);
  }
}
