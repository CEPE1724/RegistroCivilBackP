import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListaNegraCedulaService } from './lista-negra-cedula.service';
import { CreateListaNegraCedulaDto } from './dto/create-lista-negra-cedula.dto';
import { Auth } from 'src/auth/decorators';

@Controller('lista-negra-cedula')
export class ListaNegraCedulaController {
  constructor(private readonly listaNegraCedulaService: ListaNegraCedulaService) {}

  @Post()
  @Auth()
  create(@Body() createListaNegraCedulaDto: CreateListaNegraCedulaDto) {
    return this.listaNegraCedulaService.create(createListaNegraCedulaDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.listaNegraCedulaService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.listaNegraCedulaService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  updateActivo(
    @Param('id') id: string,
    @Body() body: { activo: boolean }
  ) {
    return this.listaNegraCedulaService.updateActivo(+id, body.activo);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.listaNegraCedulaService.remove(+id);
  }

  @Get('cedula/:cedula')
  @Auth()
  findByCedula(@Param('cedula') cedula: string) {
    return this.listaNegraCedulaService.findByCedula(cedula);
  }
}
