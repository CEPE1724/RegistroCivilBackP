import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolePermissionsWebService } from './role-permissions-web.service';
import { CreateRolePermissionsWebDto } from './dto/create-role-permissions-web.dto';
import { UpdateRolePermissionsWebDto } from './dto/update-role-permissions-web.dto';
import { Auth } from 'src/auth/decorators';

@Controller('role-permissions-web')
export class RolePermissionsWebController {
  constructor(private readonly rolePermissionsWebService: RolePermissionsWebService) {}

  @Post()
  @Auth()
  create(@Body() createRolePermissionsWebDto: CreateRolePermissionsWebDto) {
    return this.rolePermissionsWebService.create(createRolePermissionsWebDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.rolePermissionsWebService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.rolePermissionsWebService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateRolePermissionsWebDto: UpdateRolePermissionsWebDto) {
    return this.rolePermissionsWebService.update(+id, updateRolePermissionsWebDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.rolePermissionsWebService.remove(+id);
  }
}
