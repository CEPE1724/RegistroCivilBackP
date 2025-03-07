import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioBodegaService } from './usuario-bodega.service';
import { UsuarioBodegaController } from './usuario-bodega.controller';
import { UsuarioBodega } from './entities/usuario-bodega.entity';
import { Usuario } from './entities/usuario.entity';
import { Bodega } from './entities/bodega.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioBodega, Usuario, Bodega]), // Asegúrate de registrar las 3 entidades
  ],
  controllers: [UsuarioBodegaController],
  providers: [UsuarioBodegaService],
})
export class UsuarioBodegaModule {}
