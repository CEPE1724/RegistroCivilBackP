import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuarios.entity';
import { MenuItemRole } from './entities/menu-item-role.entity';
import { MenuItems } from './entities/menu_items.entity';

@Injectable()
export class MenuItemRoleService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(MenuItemRole)
    private readonly menuItemRoleRepository: Repository<MenuItemRole>,
    @InjectRepository(MenuItems)
    private readonly menuItemsRepository: Repository<MenuItems>,
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
