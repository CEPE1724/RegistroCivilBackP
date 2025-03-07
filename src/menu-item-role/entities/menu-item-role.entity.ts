
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { MenuItems } from './menu_items.entity';

@Entity('menu_item_roles')
export class MenuItemRole {
  @PrimaryGeneratedColumn()
  idmenu_item_roles: number;

  @ManyToOne(() => Usuario, usuario => usuario.idUsuario)
  @JoinColumn({ name: 'idUsuario' })
  idUsuario: Usuario;

  @ManyToOne(() => MenuItems, menuItems => menuItems.menuItemRoles)
  @JoinColumn({ name: 'idmenu_items' })
  MenuItem: MenuItems;
}