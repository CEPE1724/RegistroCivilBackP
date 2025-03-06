import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreCantonService } from './cre-canton.service';
import { CreateCreCantonDto } from './dto/create-cre-canton.dto';
import { UpdateCreCantonDto } from './dto/update-cre-canton.dto';
import { CreCanton } from './entities/cre-canton.entity';
@Controller('cre-canton')
export class CreCantonController {
  constructor(private readonly creCantonService: CreCantonService) {}
/*
  @Post()
  create(@Body() createCreCantonDto: CreateCreCantonDto) {
    return this.creCantonService.create(createCreCantonDto);
  }

  @Get()
  findAll() {
    return this.creCantonService.findAll();
  }
    */

  @Get(':idProvincia')
  async findByProvincia(@Param('idProvincia') idProvincia: string) {
    return await this.creCantonService.findByProvincia(Number(idProvincia));
  }
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreCantonDto: UpdateCreCantonDto) {
    return this.creCantonService.update(+id, updateCreCantonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creCantonService.remove(+id);
  }*/
}
