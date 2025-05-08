import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RoleswebService } from './rolesweb.service';
import { RoleswebController } from './rolesweb.controller';
import { Rolesweb } from './entities/rolesweb.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [RoleswebController],
  providers: [RoleswebService],
  imports: [
    TypeOrmModule.forFeature([Rolesweb]),
    AuthModule
  ],
  exports: [RoleswebService]
})
export class RoleswebModule {}
