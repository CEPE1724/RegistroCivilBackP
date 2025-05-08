import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RolePermissionsWebService } from './role-permissions-web.service';
import { RolePermissionsWebController } from './role-permissions-web.controller';
import { RolePermissionsWeb } from './entities/role-permissions-web.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [RolePermissionsWebController],
  providers: [RolePermissionsWebService],
  imports: [
    TypeOrmModule.forFeature([RolePermissionsWeb]),
    AuthModule
  ],
  exports: [RolePermissionsWebService]
})
export class RolePermissionsWebModule {}
