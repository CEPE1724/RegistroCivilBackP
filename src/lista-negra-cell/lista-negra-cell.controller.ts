import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListaNegraCellService } from './lista-negra-cell.service';
import { CreateListaNegraCellDto } from './dto/create-lista-negra-cell.dto';
import { UpdateListaNegraCellDto } from './dto/update-lista-negra-cell.dto';
import { Auth } from 'src/auth/decorators';

@Controller('lista-negra-cell')
export class ListaNegraCellController {
  constructor(private readonly listaNegraCellService: ListaNegraCellService) { }

  @Post()
  @Auth()
  create(@Body() createListaNegraCellDto: CreateListaNegraCellDto) {
    return this.listaNegraCellService.create(createListaNegraCellDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.listaNegraCellService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.listaNegraCellService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  updateActivo(
    @Param('id') id: string,
    @Body() body: { activo: boolean }
  ) {
    return this.listaNegraCellService.updateActivo(+id, body.activo);
  }


  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.listaNegraCellService.remove(+id);
  }

  @Get('telefono/:telefono')
  @Auth()
  findByTelefono(@Param('telefono') telefono: string) {
    return this.listaNegraCellService.findByTelefono(telefono);
  }
}
