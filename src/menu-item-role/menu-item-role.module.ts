import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MenuItemRoleService } from './menu-item-role.service';
import { MenuItemRoleController } from './menu-item-role.controller';
import { MenuItemRole } from './entities/menu-item-role.entity';
import { MenuItems } from './entities/menu_items.entity';
import { Usuario } from './entities/usuarios.entity'; // Agregar Usuario aquí
import { MenuItemAccess } from './entities/menu-items-access.entity'; // Agregar MenuItemAccess aquí
import { MenuItemAccessUser } from './entities/menu-items-access-user.entity'; // Agregar MenuItemAccessUser aquí

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuItemRole, MenuItems, Usuario, MenuItemAccess, MenuItemAccessUser, AuthModule]), // Importa todas las entidades necesarias
  ],
  controllers: [MenuItemRoleController],
  providers: [MenuItemRoleService],
})
export class MenuItemRoleModule {}
