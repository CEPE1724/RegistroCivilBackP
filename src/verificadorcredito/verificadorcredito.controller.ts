import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerificadorcreditoService } from './verificadorcredito.service';
import { CreateVerificadorcreditoDto } from './dto/create-verificadorcredito.dto';
import { UpdateVerificadorcreditoDto } from './dto/update-verificadorcredito.dto';
import { Auth } from 'src/auth/decorators';

@Controller('verificadorcredito')
export class VerificadorcreditoController {
  constructor(private readonly verificadorcreditoService: VerificadorcreditoService) {}

  @Post()
  @Auth()
  create(@Body() createVerificadorcreditoDto: CreateVerificadorcreditoDto) {
    return this.verificadorcreditoService.create(createVerificadorcreditoDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.verificadorcreditoService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.verificadorcreditoService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateVerificadorcreditoDto: UpdateVerificadorcreditoDto) {
    return this.verificadorcreditoService.update(+id, updateVerificadorcreditoDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.verificadorcreditoService.remove(+id);
  }
}
