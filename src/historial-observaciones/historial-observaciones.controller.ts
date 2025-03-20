import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialObservacionesService } from './historial-observaciones.service';
import { CreateHistorialObservacioneDto } from './dto/create-historial-observacione.dto';
import { UpdateHistorialObservacioneDto } from './dto/update-historial-observacione.dto';

@Controller('historial-observaciones')
export class HistorialObservacionesController {
  constructor(private readonly historialObservacionesService: HistorialObservacionesService) {}

  @Post()
  create(@Body() createHistorialObservacioneDto: CreateHistorialObservacioneDto) {
    return this.historialObservacionesService.create(createHistorialObservacioneDto);
  }

  @Get()
  findAll() {
    return this.historialObservacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialObservacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialObservacioneDto: UpdateHistorialObservacioneDto) {
    return this.historialObservacionesService.update(+id, updateHistorialObservacioneDto);
  }

}
