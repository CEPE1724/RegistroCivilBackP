import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioBodegaService } from './usuario-bodega.service';
import { CreateUsuarioBodegaDto } from './dto/create-usuario-bodega.dto';
import { UpdateUsuarioBodegaDto } from './dto/update-usuario-bodega.dto';

@Controller('usuario-bodega')
export class UsuarioBodegaController {
  constructor(private readonly usuarioBodegaService: UsuarioBodegaService) {}

  @Post()
  create(@Body() createUsuarioBodegaDto: CreateUsuarioBodegaDto) {
    return this.usuarioBodegaService.create(createUsuarioBodegaDto);
  }

  @Get()
  findAll() {
    return this.usuarioBodegaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioBodegaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioBodegaDto: UpdateUsuarioBodegaDto) {
    return this.usuarioBodegaService.update(+id, updateUsuarioBodegaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioBodegaService.remove(+id);
  }
}
