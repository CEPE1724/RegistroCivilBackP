import { Module } from '@nestjs/common';
import { UsuarioBodegaService } from './usuario-bodega.service';
import { UsuarioBodegaController } from './usuario-bodega.controller';

@Module({
  controllers: [UsuarioBodegaController],
  providers: [UsuarioBodegaService],
})
export class UsuarioBodegaModule {}
