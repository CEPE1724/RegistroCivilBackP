import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreProvinciaService } from './cre_provincia.service';
import { CreateCreProvinciaDto } from './dto/create-cre_provincia.dto';
import { UpdateCreProvinciaDto } from './dto/update-cre_provincia.dto';

@Controller('cre-provincia')
export class CreProvinciaController {
  constructor(private readonly creProvinciaService: CreProvinciaService) {}
/*
  @Post()
  create(@Body() createCreProvinciaDto: CreateCreProvinciaDto) {
    return this.creProvinciaService.create(createCreProvinciaDto);
  }
*/
  @Get()
  findAll() {
    return this.creProvinciaService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.creProvinciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreProvinciaDto: UpdateCreProvinciaDto) {
    return this.creProvinciaService.update(+id, updateCreProvinciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creProvinciaService.remove(+id);
  }*/
}
