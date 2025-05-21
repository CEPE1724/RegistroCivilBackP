import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe  } from '@nestjs/common';
import { HorariosanalistasService } from './horariosanalistas.service';
import { CreateHorariosanalistaDto } from './dto/create-horariosanalista.dto';
import { UpdateHorariosanalistaDto } from './dto/update-horariosanalista.dto';
import { Auth } from 'src/auth/decorators';

@Controller('horariosanalistas')
export class HorariosanalistasController {
  constructor(private readonly horariosanalistasService: HorariosanalistasService) {}

  @Post()
  @Auth()
  create(@Body() createHorariosanalistaDto: CreateHorariosanalistaDto) {
    return this.horariosanalistasService.create(createHorariosanalistaDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.horariosanalistasService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.horariosanalistasService.findOne(+id);
  }

  @Get('analista/:idAnalistaCredito/fecha/:idFechaAnalista')
  @Auth()
async getFechaAnalista(
  @Param('idAnalistaCredito', ParseIntPipe) idAnalistaCredito: number,
  @Param('idFechaAnalista', ParseIntPipe) idFechaAnalista: number
): Promise<any> {
  return await this.horariosanalistasService.getFechaAnalista(idAnalistaCredito, idFechaAnalista);
}

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateHorariosanalistaDto: UpdateHorariosanalistaDto) {
    return this.horariosanalistasService.update(+id, updateHorariosanalistaDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.horariosanalistasService.remove(+id);
  }
}
