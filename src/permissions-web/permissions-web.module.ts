import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsWebService } from './permissions-web.service';
import { PermissionsWebController } from './permissions-web.controller';
import { PermissionsWeb } from './entities/permissions-web.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [PermissionsWebController],
  providers: [PermissionsWebService],
  imports: [
    TypeOrmModule.forFeature([PermissionsWeb]),
    AuthModule
  ],
  exports: [PermissionsWebService]
})
export class PermissionsWebModule {}

