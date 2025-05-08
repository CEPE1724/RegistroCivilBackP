import { Module } from '@nestjs/common';
import { UserRolesWebService } from './user-roles-web.service';
import { UserRolesWebController } from './user-roles-web.controller';
import { UserRolesWeb } from './entities/user-roles-web.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [UserRolesWebController],
  providers: [UserRolesWebService],
  imports: [
    TypeOrmModule.forFeature([UserRolesWeb]),
    AuthModule // Importa el módulo de autenticación si es necesario
  ],
  exports: [UserRolesWebService]
})
export class UserRolesWebModule {}







