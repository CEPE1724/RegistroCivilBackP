/*CREATE TABLE menu_items_access_user (
    idmenu_items_access_user INT IDENTITY(1,1) PRIMARY KEY,
    idmenu_items_access INT DEFAULT 0,
    idUsuario INT DEFAULT 0,
    Activo BIT DEFAULT 1,
    FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME() 
)
*/

import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { MenuItemAccess } from './menu-items-access.entity';

@Entity('menu_items_access_user')
export class MenuItemAccessUser {
    @PrimaryGeneratedColumn()
    idmenu_items_access_user: number;

    @ManyToOne(() => MenuItemAccess, menuItemAccess => menuItemAccess.idmenu_items_access)
    @JoinColumn({ name: 'idmenu_items_access' })
    idmenu_items_access: MenuItemAccess;

    @ManyToOne(() => Usuario, usuario => usuario.idUsuario)
    @JoinColumn({ name: 'idUsuario' })
    idUsuario: Usuario;

    Activo: boolean;

}

