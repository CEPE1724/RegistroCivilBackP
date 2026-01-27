import { Module } from '@nestjs/common';
import { CboTipoClienteService } from './cbo-tipo-cliente.service';
import { CboTipoClienteController } from './cbo-tipo-cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboTipoCliente } from './entities/cbo-tipo-cliente.entity';
import {CboRiesgoestado} from 'src/cbo-riesgo/entities/cbo-riesgo.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([CboTipoCliente, CboRiesgoestado]), AuthModule],
  controllers: [CboTipoClienteController],
  providers: [CboTipoClienteService],
})
export class CboTipoClienteModule {}
