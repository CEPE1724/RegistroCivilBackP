import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SeguridadmenuService } from './seguridadmenu.service';
import { SeguridadmenuController } from './seguridadmenu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rolesweb } from 'src/rolesweb/entities/rolesweb.entity';
import {PermissionsWebModule} from '../permissions-web/permissions-web.module';
import {RolePermissionsWebModule} from '../role-permissions-web/role-permissions-web.module';
import {RoleswebModule} from '../rolesweb/rolesweb.module';
import {RouteswebModule} from '../routesweb/routesweb.module';
import {UserRolesWebModule} from '../user-roles-web/user-roles-web.module';
@Module({
  controllers: [SeguridadmenuController],
  providers: [SeguridadmenuService],
  imports: [TypeOrmModule.forFeature([Rolesweb]), 
    PermissionsWebModule, RolePermissionsWebModule, RoleswebModule, RouteswebModule,
     UserRolesWebModule, AuthModule],
})
export class SeguridadmenuModule {}
