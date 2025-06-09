import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComAsignacionDeVendedoresService } from './com_asignacion-de-vendedores.service';
import { CreateComAsignacionDeVendedoreDto } from './dto/create-com_asignacion-de-vendedore.dto';
import { UpdateComAsignacionDeVendedoreDto } from './dto/update-com_asignacion-de-vendedore.dto';
import { Auth, GetUser } from '../auth/decorators';
@Controller('com-asignacion-de-vendedores')
export class ComAsignacionDeVendedoresController {
  constructor(private readonly comAsignacionDeVendedoresService: ComAsignacionDeVendedoresService) { }

  @Post()
  create(@Body() createComAsignacionDeVendedoreDto: CreateComAsignacionDeVendedoreDto) {
    return this.comAsignacionDeVendedoresService.create(createComAsignacionDeVendedoreDto);
  }

  @Get('jefes-de-bodega/:bodega')
  findAll(
    @Param('bodega') bodega: number
  ) {
    return this.comAsignacionDeVendedoresService.findAll(bodega);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comAsignacionDeVendedoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComAsignacionDeVendedoreDto: UpdateComAsignacionDeVendedoreDto) {
    return this.comAsignacionDeVendedoresService.update(+id, updateComAsignacionDeVendedoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comAsignacionDeVendedoresService.remove(+id);
  }
}
