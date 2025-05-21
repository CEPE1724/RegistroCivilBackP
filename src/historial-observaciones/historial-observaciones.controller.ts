import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialObservacionesService } from './historial-observaciones.service';
import { CreateHistorialObservacioneDto } from './dto/create-historial-observacione.dto';
import { UpdateHistorialObservacioneDto } from './dto/update-historial-observacione.dto';
import { Auth } from 'src/auth/decorators';

@Controller('historial-observaciones')
export class HistorialObservacionesController {
  constructor(private readonly historialObservacionesService: HistorialObservacionesService) {}

  @Post()
  @Auth() 
  create(@Body() createHistorialObservacioneDto: CreateHistorialObservacioneDto) {
    return this.historialObservacionesService.create(createHistorialObservacioneDto);
  }

  @Get()
  @Auth() 
  findAll() {
    return this.historialObservacionesService.findAll();
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.historialObservacionesService.findOne(+id);
  }

  @Patch(':id')
  @Auth() 
  update(@Param('id') id: string, @Body() updateHistorialObservacioneDto: UpdateHistorialObservacioneDto) {
    return this.historialObservacionesService.update(+id, updateHistorialObservacioneDto);
  }

}
