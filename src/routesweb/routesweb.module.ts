import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RouteswebService } from './routesweb.service';
import { RouteswebController } from './routesweb.controller';
import { Routesweb } from './entities/routesweb.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [RouteswebController],
  providers: [RouteswebService],
  imports: [
    TypeOrmModule.forFeature([Routesweb]),
    AuthModule
  ],
  exports: [RouteswebService]
})
export class RouteswebModule {}
