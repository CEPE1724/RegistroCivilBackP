import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListacuentasdepositosService } from './listacuentasdepositos.service';
import { CreateListacuentasdepositoDto } from './dto/create-listacuentasdeposito.dto';
import { UpdateListacuentasdepositoDto } from './dto/update-listacuentasdeposito.dto';
import { Auth } from 'src/auth/decorators';

@Controller('listacuentasdepositos')
export class ListacuentasdepositosController {
  constructor(private readonly listacuentasdepositosService: ListacuentasdepositosService) {}

  @Post()
  @Auth()
  create(@Body() createListacuentasdepositoDto: CreateListacuentasdepositoDto) {
    return this.listacuentasdepositosService.create(createListacuentasdepositoDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.listacuentasdepositosService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.listacuentasdepositosService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateListacuentasdepositoDto: UpdateListacuentasdepositoDto) {
    return this.listacuentasdepositosService.update(+id, updateListacuentasdepositoDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.listacuentasdepositosService.remove(+id);
  }
}
