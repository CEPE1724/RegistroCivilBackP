// src/cbo-gestor/cbo-gestor-cobranzas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboGestorCobranzas } from './cbo-gestor-cobranzas.entity';
import { CboGestorCobranzasService } from './cbo-gestor-cobranzas.service';
import { CboGestorCobranzasController } from './cbo-gestor-cobranzas.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CboGestorCobranzas]),AuthModule ],
  providers: [CboGestorCobranzasService],
  controllers: [CboGestorCobranzasController],
})
export class CboGestorCobranzasModule {}
