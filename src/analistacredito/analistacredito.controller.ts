import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnalistacreditoService } from './analistacredito.service';
import { CreateAnalistacreditoDto } from './dto/create-analistacredito.dto';
import { UpdateAnalistacreditoDto } from './dto/update-analistacredito.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('analistacredito')
export class AnalistacreditoController {
  constructor(private readonly analistacreditoService: AnalistacreditoService) {}

  @Post()
  @Auth()
  create(@Body() createAnalistacreditoDto: CreateAnalistacreditoDto) {
    return this.analistacreditoService.create(createAnalistacreditoDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.analistacreditoService.findAll();
  }

  @Get('usuario/:igrupo/:analista')
  @Auth()
  findAllUsers(@Param('igrupo') igrupo: number, @Param('analista') analista: string) {
    return this.analistacreditoService.findAllUser(igrupo, analista);
  }


  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.analistacreditoService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateAnalistacreditoDto: UpdateAnalistacreditoDto) {
    return this.analistacreditoService.update(+id, updateAnalistacreditoDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.analistacreditoService.remove(+id);
  }
}
