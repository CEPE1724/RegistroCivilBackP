import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreGcTelefonoService } from './cre-gc-telefono.service';
import { CreateCreGcTelefonoDto } from './dto/create-cre-gc-telefono.dto';
import { UpdateCreGcTelefonoDto } from './dto/update-cre-gc-telefono.dto';

@Controller('cre-gc-telefono')
export class CreGcTelefonoController {
  constructor(private readonly creGcTelefonoService: CreGcTelefonoService) {}

  @Post()
  create(@Body() createCreGcTelefonoDto: CreateCreGcTelefonoDto) {
    return this.creGcTelefonoService.create(createCreGcTelefonoDto);
  }

  @Get()
  findAll() {
    return this.creGcTelefonoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creGcTelefonoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreGcTelefonoDto: UpdateCreGcTelefonoDto) {
    return this.creGcTelefonoService.update(+id, updateCreGcTelefonoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creGcTelefonoService.remove(+id);
  }
}
