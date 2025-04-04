import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { Usuario } from './entities/usuarios.entity';
import { MenuItemRole } from './entities/menu-item-role.entity';
import { MenuItems } from './entities/menu_items.entity';
import { MenuItemAccess } from './entities/menu-items-access.entity'; // Agregar MenuItemAccess aquí
import { MenuItemAccessUser } from './entities/menu-items-access-user.entity'; // Agregar MenuItemAccessUser aquí
@Injectable()
export class MenuItemRoleService {
	constructor(
		@InjectRepository(Usuario)
		private readonly usuarioRepository: Repository<Usuario>,
		@InjectRepository(MenuItemRole)
		private readonly menuItemRoleRepository: Repository<MenuItemRole>,
		@InjectRepository(MenuItems)
		private readonly menuItemsRepository: Repository<MenuItems>,
		@InjectRepository(MenuItemAccess)
		private readonly menuItemAccessRepository: Repository<MenuItemAccess>, // Agregar MenuItemAccess aquí
		@InjectRepository(MenuItemAccessUser)
		private readonly menuItemAccessUserRepository: Repository<MenuItemAccessUser>, // Agregar MenuItemAccessUser aquí
	) { }

	async getUserMenuItems(userId: number) {
		// Consulta ajustada
		const queryBuilder = this.usuarioRepository.createQueryBuilder('u')
			.innerJoinAndSelect('u.menuItemRoles', 'm') // Relación con 'menu_item_roles'
			.innerJoinAndSelect('m.MenuItem', 'i') // Relación con 'menu_items'
			.where('u.idUsuario = :userId', { userId }) // Filtro por idUsuario
			.select(['u.idUsuario', 'u.Nombre', 'u.idGrupo', 'u.Activo',
				'i.idmenu_items', 'i.name', 'i.route', 'i.icon', 'i.parent_id', 'i.active', 'i.position']); // Campos a seleccionar


		const result = await queryBuilder.getRawMany();
		return result;
	}

	async getPermissionsComponents(idmenu_items: number, idUsuario: number) {
		const queryBuilder = this.menuItemsRepository.createQueryBuilder('m')
			.innerJoin('menu_items_access', 'n', 'm.idmenu_items = n.idmenu_items')
			.innerJoin('menu_item_roles', 'r', 'r.idmenu_items = n.idmenu_items')
			.innerJoin('Usuario', 'u', 'u.idUsuario = r.idUsuario')
			.innerJoin('menu_items_access_user', 'us', 'us.idmenu_items_access = n.idmenu_items_access')
			.where('n.idmenu_items = :idmenu_items', { idmenu_items })
			.andWhere('u.idUsuario = :idUsuario', { idUsuario })
			.andWhere('us.idUsuario = :idUsuario', { idUsuario })
			.select(['n.idmenu_items', 'n.Permisos', 'us.Activo']);

		const result = await queryBuilder.getRawMany();
		return result;
	};


	async getPermissionsMenu(idUsuario: number) {
		const queryBuilder = this.menuItemsRepository.createQueryBuilder('m')
			.leftJoin('menu_item_roles', 'mir', 'm.idmenu_items = mir.idmenu_items AND mir.idUsuario = :idUsuario', { idUsuario })
			.select([
				'm.idmenu_items',    // Seleccionamos el ID del menú
				'm.name AS menu_name', // Seleccionamos el nombre del menú
				'COALESCE(mir.idmenu_item_roles, 0) AS idmenu_item_roles' // Usamos COALESCE para manejar los valores nulos
			]);

		const result = await queryBuilder.getRawMany();
		return result;
	}

	async getMenuItemAccessRoles(idUsuario: number, idmenu_items: number) {
		console.log('idmenu_items', idmenu_items);
		console.log('idUsuario', idUsuario);
		const queryBuilder = this.menuItemAccessRepository.createQueryBuilder('m')
			.leftJoin('menu_items_access_user', 'u', 'u.idmenu_items_access = m.idmenu_items_access AND u.idUsuario = :idUsuario', { idUsuario })
			.where('m.idmenu_items = :idmenu_items', { idmenu_items })
			.select([
				'm.idmenu_items_access',
				'm.idmenu_items',
				'u.idUsuario',
				'u.Activo',
				'm.Permisos',
			]);

		const result = await queryBuilder.getRawMany();
		return result;
	}

	async createSingleMenuItemAccessRole(idUsuario: number, idmenu_items_access: number): Promise<string> {
		// Verificamos si ya existe para evitar duplicados
		const existing = await this.menuItemAccessUserRepository.findOne({
		  where: {
			idUsuario: Equal(idUsuario),
			idmenu_items_access: Equal(idmenu_items_access),
		  }
		});
	  
		if (existing) {
		  return `El acceso ya existe para el usuario ${idUsuario}`;
		}
	  
		const newAccess = this.menuItemAccessUserRepository.create({
			idUsuario: { idUsuario },
			idmenu_items_access: { idmenu_items_access },
			Activo: true
		  });
		  
	  
		await this.menuItemAccessUserRepository.save(newAccess);
	  
		return `Acceso ${idmenu_items_access} creado correctamente para el usuario ${idUsuario}`;
	  }
	  

	async deleteSingleMenuItemAccessRole(idUsuario: number, idmenu_items_access: number): Promise<string> {
		const entry = await this.menuItemAccessUserRepository.findOne({
			where: {
				idUsuario: Equal(idUsuario),
				idmenu_items_access: Equal(idmenu_items_access),
			}
		});

		if (!entry) {
			throw new Error(`No se encontró el permiso con id ${idmenu_items_access} para el usuario ${idUsuario}`);
		}

		await this.menuItemAccessUserRepository.remove(entry);

		return `Permiso ${idmenu_items_access} eliminado para el usuario ${idUsuario}`;
	}



	async createPermissionByUser(idUsuario: number, m_idmenu_items: number) {
		const newPermiso = this.menuItemRoleRepository.create({
			idUsuario: { idUsuario },
			MenuItem: { idmenu_items: m_idmenu_items }
		});

		const saved = await this.menuItemRoleRepository.save(newPermiso);

		return {
			idmenu_item_roles: saved.idmenu_item_roles,
			message: 'Permiso creado correctamente'
		};
	}

	async deletePermissionByUser(idUsuario: number, idmenu_item_roles: number): Promise<string> {
		const permiso = await this.menuItemRoleRepository.findOne({
			where: {
				idmenu_item_roles,
				idUsuario: Equal(idUsuario),
			},
		});

		if (!permiso) {
			throw new Error('Permiso no encontrado o no pertenece al usuario');
		}

		await this.menuItemRoleRepository.remove(permiso);
		return `Permiso con id ${idmenu_item_roles} eliminado correctamente para el usuario ${idUsuario}`;
	}

	findAll() {
		return 'This action returns all menuItemRole';
	}

	findOne(id: number) {
		return `This action returns a #${id} menuItemRole`;
	}



	remove(id: number) {
		return `This action removes a #${id} menuItemRole`;
	}
}