import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioBodegaService } from './usuario-bodega.service';
import { UsuarioBodegaController } from './usuario-bodega.controller';
import { UsuarioBodega } from './entities/usuario-bodega.entity';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Almacen } from 'src/almacenes/entities/almacene.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioBodega, Usuario, Almacen]), // Asegúrate de registrar las 4 entidades
    AuthModule, // Importa el módulo de autenticación si es necesario
  ],
  controllers: [UsuarioBodegaController],
  providers: [UsuarioBodegaService],
})
export class UsuarioBodegaModule {}
