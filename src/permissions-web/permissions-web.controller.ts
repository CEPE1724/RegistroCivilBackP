import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionsWebService } from './permissions-web.service';
import { CreatePermissionsWebDto } from './dto/create-permissions-web.dto';
import { UpdatePermissionsWebDto } from './dto/update-permissions-web.dto';

@Controller('permissions-web')
export class PermissionsWebController {
  constructor(private readonly permissionsWebService: PermissionsWebService) {}

  @Post()
  create(@Body() createPermissionsWebDto: CreatePermissionsWebDto) {
    return this.permissionsWebService.create(createPermissionsWebDto);
  }

  @Get()
  findAll() {
    return this.permissionsWebService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsWebService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionsWebDto: UpdatePermissionsWebDto) {
    return this.permissionsWebService.update(+id, updatePermissionsWebDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsWebService.remove(+id);
  }
}
