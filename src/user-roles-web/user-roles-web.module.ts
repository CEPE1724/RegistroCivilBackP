import { Module } from '@nestjs/common';
import { UserRolesWebService } from './user-roles-web.service';
import { UserRolesWebController } from './user-roles-web.controller';
import { UserRolesWeb } from './entities/user-roles-web.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserRolesWebController],
  providers: [UserRolesWebService],
  imports: [
    TypeOrmModule.forFeature([UserRolesWeb]),
  ],
  exports: [UserRolesWebService]
})
export class UserRolesWebModule {}







