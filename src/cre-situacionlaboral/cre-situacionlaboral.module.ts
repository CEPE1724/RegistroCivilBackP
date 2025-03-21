import { Module } from '@nestjs/common';
import { CreSituacionlaboralService } from './cre-situacionlaboral.service';
import { CreSituacionlaboralController } from './cre-situacionlaboral.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreSituacionlaboral } from './entities/cre-situacionlaboral.entity';
@Module({
  controllers: [CreSituacionlaboralController],
  providers: [CreSituacionlaboralService],
  imports: [TypeOrmModule.forFeature([CreSituacionlaboral])],
})
export class CreSituacionlaboralModule {}
