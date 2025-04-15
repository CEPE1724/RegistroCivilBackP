import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe  } from '@nestjs/common';
import { HorariosanalistasService } from './horariosanalistas.service';
import { CreateHorariosanalistaDto } from './dto/create-horariosanalista.dto';
import { UpdateHorariosanalistaDto } from './dto/update-horariosanalista.dto';

@Controller('horariosanalistas')
export class HorariosanalistasController {
  constructor(private readonly horariosanalistasService: HorariosanalistasService) {}

  @Post()
  create(@Body() createHorariosanalistaDto: CreateHorariosanalistaDto) {
    return this.horariosanalistasService.create(createHorariosanalistaDto);
  }

  @Get()
  findAll() {
    return this.horariosanalistasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horariosanalistasService.findOne(+id);
  }

  @Get('analista/:idAnalistaCredito/fecha/:idFechaAnalista')
async getFechaAnalista(
  @Param('idAnalistaCredito', ParseIntPipe) idAnalistaCredito: number,
  @Param('idFechaAnalista', ParseIntPipe) idFechaAnalista: number
): Promise<any> {
  return await this.horariosanalistasService.getFechaAnalista(idAnalistaCredito, idFechaAnalista);
}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorariosanalistaDto: UpdateHorariosanalistaDto) {
    return this.horariosanalistasService.update(+id, updateHorariosanalistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horariosanalistasService.remove(+id);
  }
}
