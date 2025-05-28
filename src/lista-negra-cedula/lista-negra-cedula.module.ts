import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ListaNegraCedulaService } from './lista-negra-cedula.service';
import { ListaNegraCedulaController } from './lista-negra-cedula.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListaNegraCedula } from './entities/lista-negra-cedula.entity';

@Module({
  controllers: [ListaNegraCedulaController],
  providers: [ListaNegraCedulaService],
  imports: [TypeOrmModule.forFeature([ListaNegraCedula]), AuthModule],
})
export class ListaNegraCedulaModule {}
