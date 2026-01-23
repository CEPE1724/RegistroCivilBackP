// src/cbo-gestor/cbo-gestor-cobranzas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboGestorCobranzas } from './cbo-gestor-cobranzas.entity';
import { CboGestorCobranzasService } from './cbo-gestor-cobranzas.service';
import { CboGestorCobranzasController } from './cbo-gestor-cobranzas.controller';
import { CboGestorCobranzasOperativoService } from './cbo-gestor-cobranzas-operativo.service';
import { CboGestorCobranzasOperativoController } from './cbo-gestor-cobranzas-operativo.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CboGestorCobranzas]), AuthModule],
  providers: [CboGestorCobranzasService, CboGestorCobranzasOperativoService],
  controllers: [CboGestorCobranzasController, CboGestorCobranzasOperativoController],
  exports: [CboGestorCobranzasService, CboGestorCobranzasOperativoService],
})
export class CboGestorCobranzasModule {}
