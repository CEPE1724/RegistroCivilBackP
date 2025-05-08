import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioBodegaService } from './usuario-bodega.service';
import { UsuarioBodegaController } from './usuario-bodega.controller';
import { UsuarioBodega } from './entities/usuario-bodega.entity';
import { Usuario } from './entities/usuario.entity';
import { Bodega } from './entities/bodega.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioBodega, Usuario, Bodega]), // Asegúrate de registrar las 3 entidades
    AuthModule, // Importa el módulo de autenticación si es necesario
  ],
  controllers: [UsuarioBodegaController],
  providers: [UsuarioBodegaService],
})
export class UsuarioBodegaModule {}
