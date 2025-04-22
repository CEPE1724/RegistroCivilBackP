import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnalistacreditoService } from './analistacredito.service';
import { CreateAnalistacreditoDto } from './dto/create-analistacredito.dto';
import { UpdateAnalistacreditoDto } from './dto/update-analistacredito.dto';

@Controller('analistacredito')
export class AnalistacreditoController {
  constructor(private readonly analistacreditoService: AnalistacreditoService) {}

  @Post()
  create(@Body() createAnalistacreditoDto: CreateAnalistacreditoDto) {
    return this.analistacreditoService.create(createAnalistacreditoDto);
  }

  @Get()
  findAll() {
    return this.analistacreditoService.findAll();
  }

  @Get('usuario/:igrupo/:analista')
  findAllUsers(@Param('igrupo') igrupo: number, @Param('analista') analista: string) {
    return this.analistacreditoService.findAllUser(igrupo, analista);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analistacreditoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnalistacreditoDto: UpdateAnalistacreditoDto) {
    return this.analistacreditoService.update(+id, updateAnalistacreditoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analistacreditoService.remove(+id);
  }
}
