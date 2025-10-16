import { Module } from '@nestjs/common';
import { Tokensia365Service } from './tokensia365.service';
import { Tokensia365Controller } from './tokensia365.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokensia365 } from './entities/tokensia365.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tokensia365])],
  controllers: [Tokensia365Controller],
  providers: [Tokensia365Service],
  exports: [Tokensia365Service],
})
export class Tokensia365Module {}
