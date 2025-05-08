import { Module } from '@nestjs/common';
import { CoordenadasprefacturaService } from './coordenadasprefactura.service';
import { CoordenadasprefacturaController } from './coordenadasprefactura.controller';
import { Coordenadasprefactura } from './entities/coordenadasprefactura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [CoordenadasprefacturaController],
  providers: [CoordenadasprefacturaService],
  imports: [ TypeOrmModule.forFeature([Coordenadasprefactura]), AuthModule],
})
export class CoordenadasprefacturaModule {}

