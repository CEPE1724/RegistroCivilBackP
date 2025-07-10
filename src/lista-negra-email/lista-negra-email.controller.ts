import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListaNegraEmailService } from './lista-negra-email.service';
import { CreateListaNegraEmailDto } from './dto/create-lista-negra-email.dto';
import { UpdateListaNegraEmailDto } from './dto/update-lista-negra-email.dto';
import { Auth } from 'src/auth/decorators';

@Controller('lista-negra-email')
export class ListaNegraEmailController {
  constructor(private readonly listaNegraEmailService: ListaNegraEmailService) { }

  @Post()
  @Auth()
  create(@Body() createListaNegraEmailDto: CreateListaNegraEmailDto) {
    return this.listaNegraEmailService.create(createListaNegraEmailDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.listaNegraEmailService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.listaNegraEmailService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  updateActivo(
    @Param('id') id: string,
    @Body() body: { activo: boolean }
  ) {
    return this.listaNegraEmailService.updateActivo(+id, body.activo);
  }


  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.listaNegraEmailService.remove(+id);
  }

  @Get('email/:email')
  @Auth()
  findByEmail(@Param('email') email: string) {
    return this.listaNegraEmailService.findByEmail(email);
  }
}
