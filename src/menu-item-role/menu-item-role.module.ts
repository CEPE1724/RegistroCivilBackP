import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemRoleService } from './menu-item-role.service';
import { MenuItemRoleController } from './menu-item-role.controller';
import { MenuItemRole } from './entities/menu-item-role.entity';
import { MenuItems } from './entities/menu_items.entity';
import { Usuario } from './entities/usuarios.entity'; // Agregar Usuario aquí

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuItemRole, MenuItems, Usuario]), // Importa todas las entidades necesarias
  ],
  controllers: [MenuItemRoleController],
  providers: [MenuItemRoleService],
})
export class MenuItemRoleModule {}
