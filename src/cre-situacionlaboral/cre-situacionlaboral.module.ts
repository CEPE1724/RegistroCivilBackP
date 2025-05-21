import { Module } from '@nestjs/common';
import { CreSituacionlaboralService } from './cre-situacionlaboral.service';
import { CreSituacionlaboralController } from './cre-situacionlaboral.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreSituacionlaboral } from './entities/cre-situacionlaboral.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [CreSituacionlaboralController],
  providers: [CreSituacionlaboralService],
  imports: [TypeOrmModule.forFeature([CreSituacionlaboral]) , AuthModule],
})
export class CreSituacionlaboralModule {}
