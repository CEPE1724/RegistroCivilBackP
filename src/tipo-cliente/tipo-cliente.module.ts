import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TipoClienteService } from './tipo-cliente.service';
import { TipoClienteController } from './tipo-cliente.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoCliente } from './entities/tipo-cliente.entity';

@Module({
  controllers: [TipoClienteController],
  providers: [TipoClienteService],
  imports: [
    TypeOrmModule.forFeature([TipoCliente]),
    AuthModule // Importa el módulo de autenticación si es necesario
  ]
})
export class TipoClienteModule {}
