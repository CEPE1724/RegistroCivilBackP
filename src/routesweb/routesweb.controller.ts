import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RouteswebService } from './routesweb.service';
import { CreateRouteswebDto } from './dto/create-routesweb.dto';
import { UpdateRouteswebDto } from './dto/update-routesweb.dto';
import { Auth } from 'src/auth/decorators';

@Controller('routesweb')
export class RouteswebController {
  constructor(private readonly routeswebService: RouteswebService) {}

  @Post()
  @Auth()
  create(@Body() createRouteswebDto: CreateRouteswebDto) {
    return this.routeswebService.create(createRouteswebDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.routeswebService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.routeswebService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateRouteswebDto: UpdateRouteswebDto) {
    return this.routeswebService.update(+id, updateRouteswebDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.routeswebService.remove(+id);
  }
}
