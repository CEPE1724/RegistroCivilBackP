
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuItemRole } from './menu-item-role.entity';

@Entity('menu_items')
export class MenuItems {
  @PrimaryGeneratedColumn()
  idmenu_items: number;

  @Column()
  name: string;

  @Column()
  route: string;

  @Column()
  icon: string;

  @Column({ default: null })
  parent_id: number;

  @Column({ default: 0 })
  active: number;

  @Column({ default: 0 })
  position: number;



  @OneToMany(() => MenuItemRole, menuItemRole => menuItemRole.MenuItem)
  menuItemRoles: MenuItemRole[];
}
