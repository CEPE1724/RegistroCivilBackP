import { Module } from '@nestjs/common';
import { DetalleTipoClienteService } from './detalle-tipo-cliente.service';
import { DetalleTipoClienteController } from './detalle-tipo-cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleTipoCliente } from './entities/detalle-tipo-cliente.entity';

@Module({
  controllers: [DetalleTipoClienteController],
  providers: [DetalleTipoClienteService],
  imports: [
    TypeOrmModule.forFeature([DetalleTipoCliente]),
  ]
})
export class DetalleTipoClienteModule {}
