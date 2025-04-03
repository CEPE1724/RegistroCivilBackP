/*
CREATE  TABLE menu_items_access (
    idmenu_items_access INT IDENTITY(1,1) PRIMARY KEY,
    idmenu_items INT DEFAULT 0,
    Permisos VARCHAR(200))*/
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { MenuItems } from './menu_items.entity';

@Entity('menu_items_access')
export class MenuItemAccess {
@PrimaryGeneratedColumn()
    idmenu_items_access: number;

    @ManyToOne(() => Usuario, usuario => usuario.idUsuario)
    @JoinColumn({ name: 'idUsuario' })
    idUsuario: Usuario;

    @ManyToOne(() => MenuItems, menuItems => menuItems.idmenu_items)
    @JoinColumn({ name: 'idmenu_items' })
    MenuItem: MenuItems;
}