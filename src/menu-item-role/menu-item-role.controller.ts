import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MenuItemRoleService } from './menu-item-role.service';
import { CreateMenuItemRoleDto } from './dto/create-menu-item-role.dto';
import { UpdateMenuItemRoleDto } from './dto/update-menu-item-role.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('menu-item-role')
export class MenuItemRoleController {

	constructor(private readonly menuItemRoleService: MenuItemRoleService) { }


	@Get(':userId/menu')
	@UseGuards(AuthGuard())
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

	@Get('accessroles/:idUsuario/:idmenu_items')
	getMenuItemAccessRoles(
		@Param('idUsuario') idUsuario: number,
		@Param('idmenu_items') idmenu_items: number
	) {
		return this.menuItemRoleService.getMenuItemAccessRoles(idUsuario, idmenu_items);
	}


	@Post('accessroles/create/:idUsuario/:idmenu_items_access')
	async createSingleMenuItemAccess(
		@Param('idUsuario') idUsuario: number,
		@Param('idmenu_items_access') idmenu_items_access: number,
	) {
		return this.menuItemRoleService.createSingleMenuItemAccessRole(idUsuario, idmenu_items_access);
	}


	@Delete('accessroles/delete/:idUsuario/:idmenu_items_access')
	async deleteSingleMenuItemAccess(
		@Param('idUsuario') idUsuario: number,
		@Param('idmenu_items_access') idmenu_items_access: number,
	) {
		return this.menuItemRoleService.deleteSingleMenuItemAccessRole(idUsuario, idmenu_items_access);
	}



	@Get()
	findAll() {
		return this.menuItemRoleService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.menuItemRoleService.findOne(+id);
	}

	@Post('permisos/create/:idUsuario/:m_idmenu_items')
	async createUserPermission(
		@Param('idUsuario') idUsuario: number,
		@Param('m_idmenu_items') m_idmenu_items: number
	) {
		return this.menuItemRoleService.createPermissionByUser(idUsuario, m_idmenu_items);
	}




	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.menuItemRoleService.remove(+id);
	}

	@Delete('permisos/delete/:idUsuario/:idmenu_item_roles')
	async deleteUserPermission(
		@Param('idUsuario') idUsuario: number,
		@Param('idmenu_item_roles') idmenu_item_roles: number,
	) {
		return this.menuItemRoleService.deletePermissionByUser(idUsuario, idmenu_item_roles);
	}

}
