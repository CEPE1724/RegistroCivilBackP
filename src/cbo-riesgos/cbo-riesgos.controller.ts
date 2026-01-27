import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CboRiesgosService } from './cbo-riesgos.service';
import { CreateCboRiesgoDto } from './dto/create-cbo-riesgo.dto';
import { UpdateCboRiesgoDto } from './dto/update-cbo-riesgo.dto';

@Controller('cbo-riesgos')
export class CboRiesgosController {
  constructor(private readonly cboRiesgosService: CboRiesgosService) {}

  @Post()
  create(@Body() createCboRiesgoDto: CreateCboRiesgoDto) {
    return this.cboRiesgosService.create(createCboRiesgoDto);
  }

  @Get()
  findAll(@Query('cbo_gestorRiesgo') cbo_gestorRiesgo: string) {
    return this.cboRiesgosService.findAll(cbo_gestorRiesgo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCboRiesgoDto: UpdateCboRiesgoDto) {
    return this.cboRiesgosService.update(+id, updateCboRiesgoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cboRiesgosService.remove(+id);
  }
}
