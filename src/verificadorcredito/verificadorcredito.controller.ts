import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerificadorcreditoService } from './verificadorcredito.service';
import { CreateVerificadorcreditoDto } from './dto/create-verificadorcredito.dto';
import { UpdateVerificadorcreditoDto } from './dto/update-verificadorcredito.dto';

@Controller('verificadorcredito')
export class VerificadorcreditoController {
  constructor(private readonly verificadorcreditoService: VerificadorcreditoService) {}

  @Post()
  create(@Body() createVerificadorcreditoDto: CreateVerificadorcreditoDto) {
    return this.verificadorcreditoService.create(createVerificadorcreditoDto);
  }

  @Get()
  findAll() {
    return this.verificadorcreditoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verificadorcreditoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerificadorcreditoDto: UpdateVerificadorcreditoDto) {
    return this.verificadorcreditoService.update(+id, updateVerificadorcreditoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verificadorcreditoService.remove(+id);
  }
}
