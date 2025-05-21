import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngresoCobradorService } from './ingreso-cobrador.service';
import { CreateIngresoCobradorDto } from './dto/create-ingreso-cobrador.dto';
import { UpdateIngresoCobradorDto } from './dto/update-ingreso-cobrador.dto';
import { Auth } from 'src/auth/decorators';

@Controller('ingreso-cobrador')
export class IngresoCobradorController {
  constructor(private readonly ingresoCobradorService: IngresoCobradorService) {}

//   @Post()
//   create(@Body() createIngresoCobradorDto: CreateIngresoCobradorDto) {
//     return this.ingresoCobradorService.create(createIngresoCobradorDto);
//   }

  @Get()
  @Auth()
  findAll() {
    return this.ingresoCobradorService.findAll();
  }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.ingresoCobradorService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateIngresoCobradorDto: UpdateIngresoCobradorDto) {
//     return this.ingresoCobradorService.update(+id, updateIngresoCobradorDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.ingresoCobradorService.remove(+id);
//   }
}
