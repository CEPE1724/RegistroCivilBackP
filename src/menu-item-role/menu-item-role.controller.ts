import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuItemRoleService } from './menu-item-role.service';
import { CreateMenuItemRoleDto } from './dto/create-menu-item-role.dto';
import { UpdateMenuItemRoleDto } from './dto/update-menu-item-role.dto';

@Controller('menu-item-role')
export class MenuItemRoleController {
  constructor(private readonly menuItemRoleService: MenuItemRoleService) {}

  @Get(':userId/menu')
  async getUserMenuItems(@Param('userId') userId: number) {
    return this.menuItemRoleService.getUserMenuItems(userId);
  }

  @Get('permissionscomponents/:idmenu_items/:idUsuario')
   async getPermissionsComponents(
           @Param('idmenu_items') idmenu_items: number, 
           @Param('idUsuario') idUsuario: number) {
    return this.menuItemRoleService.getPermissionsComponents(idmenu_items, idUsuario);
  }

  @Get('permissionsmenu/:idUsuario')
  async getPermissionsMenu(@Param('idUsuario') idUsuario: number) {
      return this.menuItemRoleService.getPermissionsMenu(idUsuario);
    }

 

  @Get()
  findAll() {
    return this.menuItemRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuItemRoleService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemRoleService.remove(+id);
  }
}
