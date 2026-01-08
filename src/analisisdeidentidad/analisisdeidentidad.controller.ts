import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnalisisdeidentidadService } from './analisisdeidentidad.service';
import { CreateAnalisisdeidentidadDto } from './dto/create-analisisdeidentidad.dto';
import { UpdateAnalisisdeidentidadDto } from './dto/update-analisisdeidentidad.dto';

@Controller('analisisdeidentidad')
export class AnalisisdeidentidadController {
  constructor(private readonly analisisdeidentidadService: AnalisisdeidentidadService) {}

  @Post()
  create(@Body() createAnalisisdeidentidadDto: CreateAnalisisdeidentidadDto) {
    return this.analisisdeidentidadService.create(createAnalisisdeidentidadDto);
  }

  @Get('/find-all/:identificacion/:cre_solicitud')
  findAnalisis(@Param('identificacion') identificacion: string, @Param('cre_solicitud') cre_solicitud: number) {
    return this.analisisdeidentidadService.findAnalisis(identificacion, cre_solicitud);
  }

  
}
