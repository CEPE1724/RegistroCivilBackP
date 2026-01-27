import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CboSegmentosService } from './cbo-segmentos.service';
import { CreateCboSegmentoDto } from './dto/create-cbo-segmento.dto';
import { UpdateCboSegmentoDto } from './dto/update-cbo-segmento.dto';
import { Auth } from '../auth/decorators';
@Controller('cbo-segmentos')
export class CboSegmentosController {
  constructor(private readonly cboSegmentosService: CboSegmentosService) {}

  @Post()
  create(@Body() createCboSegmentoDto: CreateCboSegmentoDto) {
    return this.cboSegmentosService.create(createCboSegmentoDto);
  }


   @Get()
   @Auth()
  findAll(@Query('cbo_segmento') cbo_segmento: string) {
    return this.cboSegmentosService.findAll(cbo_segmento);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cboSegmentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCboSegmentoDto: UpdateCboSegmentoDto) {
    return this.cboSegmentosService.update(+id, updateCboSegmentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cboSegmentosService.remove(+id);
  }
}

 