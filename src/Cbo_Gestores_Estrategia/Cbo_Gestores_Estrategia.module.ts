// src/cbo-gestores/cbo-gestores-estrategia.module.ts
import { Module } from '@nestjs/common';
import { CboGestoresEstrategiaService } from './Cbo_Gestores_Estrategia.service';
import { CboGestoresEstrategiaController } from './Cbo_Gestores_Estrategia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboGestoresEstrategia } from './Cbo_Gestores_Estrategia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CboGestoresEstrategia])],
  controllers: [CboGestoresEstrategiaController],
  providers: [CboGestoresEstrategiaService],
})
export class CboGestoresEstrategiaModule {}
