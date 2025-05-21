import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRolesWebService } from './user-roles-web.service';
import { CreateUserRolesWebDto } from './dto/create-user-roles-web.dto';
import { UpdateUserRolesWebDto } from './dto/update-user-roles-web.dto';
import { Auth } from 'src/auth/decorators';

@Controller('user-roles-web')
export class UserRolesWebController {
  constructor(private readonly userRolesWebService: UserRolesWebService) {}

  @Post()
  @Auth()
  create(@Body() createUserRolesWebDto: CreateUserRolesWebDto) {
    return this.userRolesWebService.create(createUserRolesWebDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.userRolesWebService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.userRolesWebService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateUserRolesWebDto: UpdateUserRolesWebDto) {
    return this.userRolesWebService.update(+id, updateUserRolesWebDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.userRolesWebService.remove(+id);
  }
}
