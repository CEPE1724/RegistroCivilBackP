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
  ) {}

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
