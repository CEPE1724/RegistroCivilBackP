import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CboAlmacenesService } from './cbo-almacenes.service';
import { CreateCboAlmaceneDto } from './dto/create-cbo-almacene.dto';
import { UpdateCboAlmaceneDto } from './dto/update-cbo-almacene.dto';
import { Auth } from 'src/auth/decorators';
@Controller('cbo-almacenes')
export class CboAlmacenesController {
  constructor(private readonly cboAlmacenesService: CboAlmacenesService) {}

  @Post()
  @Auth()
  create(@Body() createCboAlmaceneDto: CreateCboAlmaceneDto) {
    return this.cboAlmacenesService.create(createCboAlmaceneDto);
  }

  
  
    @Get()
    @Auth()
    findAll(@Query('cbo_almacenes') cbo_almacenes: string) {
      return this.cboAlmacenesService.findAll(cbo_almacenes);
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cboAlmacenesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCboAlmaceneDto: UpdateCboAlmaceneDto) {
    return this.cboAlmacenesService.update(+id, updateCboAlmaceneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cboAlmacenesService.remove(+id);
  }
}
