import { Module } from '@nestjs/common';
import { FechaVerificadorService } from './fecha-verificador.service';
import { FechaVerificadorController } from './fecha-verificador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FechaVerificador } from './entities/fecha-verificador.entity';

@Module({
  controllers: [FechaVerificadorController],
  providers: [FechaVerificadorService],
  imports: [TypeOrmModule.forFeature([FechaVerificador])],
})
export class FechaVerificadorModule {}
