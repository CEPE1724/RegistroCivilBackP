import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListacuentasdepositosService } from './listacuentasdepositos.service';
import { CreateListacuentasdepositoDto } from './dto/create-listacuentasdeposito.dto';
import { UpdateListacuentasdepositoDto } from './dto/update-listacuentasdeposito.dto';

@Controller('listacuentasdepositos')
export class ListacuentasdepositosController {
  constructor(private readonly listacuentasdepositosService: ListacuentasdepositosService) {}

  @Post()
  create(@Body() createListacuentasdepositoDto: CreateListacuentasdepositoDto) {
    return this.listacuentasdepositosService.create(createListacuentasdepositoDto);
  }

  @Get()
  findAll() {
    return this.listacuentasdepositosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listacuentasdepositosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListacuentasdepositoDto: UpdateListacuentasdepositoDto) {
    return this.listacuentasdepositosService.update(+id, updateListacuentasdepositoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listacuentasdepositosService.remove(+id);
  }
}
