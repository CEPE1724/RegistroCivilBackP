import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleswebService } from './rolesweb.service';
import { CreateRoleswebDto } from './dto/create-rolesweb.dto';
import { UpdateRoleswebDto } from './dto/update-rolesweb.dto';

@Controller('rolesweb')
export class RoleswebController {
  constructor(private readonly roleswebService: RoleswebService) {}

  @Post()
  create(@Body() createRoleswebDto: CreateRoleswebDto) {
    return this.roleswebService.create(createRoleswebDto);
  }

  @Get()
  findAll() {
    return this.roleswebService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleswebService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleswebDto: UpdateRoleswebDto) {
    return this.roleswebService.update(+id, updateRoleswebDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleswebService.remove(+id);
  }
}
