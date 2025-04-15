import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RouteswebService } from './routesweb.service';
import { CreateRouteswebDto } from './dto/create-routesweb.dto';
import { UpdateRouteswebDto } from './dto/update-routesweb.dto';

@Controller('routesweb')
export class RouteswebController {
  constructor(private readonly routeswebService: RouteswebService) {}

  @Post()
  create(@Body() createRouteswebDto: CreateRouteswebDto) {
    return this.routeswebService.create(createRouteswebDto);
  }

  @Get()
  findAll() {
    return this.routeswebService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeswebService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteswebDto: UpdateRouteswebDto) {
    return this.routeswebService.update(+id, updateRouteswebDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeswebService.remove(+id);
  }
}
