import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleswebService } from './rolesweb.service';
import { CreateRoleswebDto } from './dto/create-rolesweb.dto';
import { UpdateRoleswebDto } from './dto/update-rolesweb.dto';
import { Auth } from 'src/auth/decorators';

@Controller('rolesweb')
export class RoleswebController {
  constructor(private readonly roleswebService: RoleswebService) {}

  @Post()
  @Auth()
  create(@Body() createRoleswebDto: CreateRoleswebDto) {
    return this.roleswebService.create(createRoleswebDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.roleswebService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.roleswebService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateRoleswebDto: UpdateRoleswebDto) {
    return this.roleswebService.update(+id, updateRoleswebDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.roleswebService.remove(+id);
  }
}
