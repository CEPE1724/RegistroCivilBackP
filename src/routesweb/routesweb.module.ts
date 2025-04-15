import { Module } from '@nestjs/common';
import { RouteswebService } from './routesweb.service';
import { RouteswebController } from './routesweb.controller';
import { Routesweb } from './entities/routesweb.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [RouteswebController],
  providers: [RouteswebService],
  imports: [
    TypeOrmModule.forFeature([Routesweb]),
  ],
  exports: [RouteswebService]
})
export class RouteswebModule {}
