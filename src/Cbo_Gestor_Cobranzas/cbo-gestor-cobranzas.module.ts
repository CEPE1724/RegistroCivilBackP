// src/cbo-gestor/cbo-gestor-cobranzas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboGestorCobranzas } from './cbo-gestor-cobranzas.entity';
import { CboGestorCobranzasService } from './cbo-gestor-cobranzas.service';
import { CboGestorCobranzasController } from './cbo-gestor-cobranzas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CboGestorCobranzas])],
  providers: [CboGestorCobranzasService],
  controllers: [CboGestorCobranzasController],
})
export class CboGestorCobranzasModule {}
