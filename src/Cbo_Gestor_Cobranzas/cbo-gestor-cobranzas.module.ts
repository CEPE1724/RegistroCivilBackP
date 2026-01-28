// src/cbo-gestor/cbo-gestor-cobranzas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboGestorCobranzas } from './cbo-gestor-cobranzas.entity';
import { CboGestorCobranzasService } from './cbo-gestor-cobranzas.service';
import { CboGestorCobranzasController } from './cbo-gestor-cobranzas.controller';
import { CboGestorCobranzasOperativoService } from './cbo-gestor-cobranzas-operativo.service';
import { CboGestorCobranzasOperativoController } from './cbo-gestor-cobranzas-operativo.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PersonalBddModule } from 'src/personal-bdd/personal-bdd.module';
import { RedisModule } from 'src/redis/redis.module';
import { CreSolicitudwebWsModule } from 'src/cre_solicitudweb-ws/cre_solicitudweb-ws.module';
@Module({
  imports: [TypeOrmModule.forFeature([CboGestorCobranzas]), AuthModule, PersonalBddModule, RedisModule, CreSolicitudwebWsModule],
  providers: [CboGestorCobranzasService, CboGestorCobranzasOperativoService],
  controllers: [CboGestorCobranzasController, CboGestorCobranzasOperativoController],
  exports: [CboGestorCobranzasService, CboGestorCobranzasOperativoService],
 
})
export class CboGestorCobranzasModule {}
