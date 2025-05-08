import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ListaNegraCellService } from './lista-negra-cell.service';
import { ListaNegraCellController } from './lista-negra-cell.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListaNegraCell } from './entities/lista-negra-cell.entity';
import { Type } from 'class-transformer';

@Module({
  controllers: [ListaNegraCellController],
  providers: [ListaNegraCellService],
  imports: [TypeOrmModule.forFeature([ListaNegraCell]), AuthModule],
})
export class ListaNegraCellModule {}
