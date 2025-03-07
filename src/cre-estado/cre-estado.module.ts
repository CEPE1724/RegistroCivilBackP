import { Module } from '@nestjs/common';
import { CreEstadoService } from './cre-estado.service';
import { CreEstadoController } from './cre-estado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreEstado } from './entities/cre-estado.entity';


@Module({
  controllers: [CreEstadoController],
  providers: [CreEstadoService],
  imports: [TypeOrmModule.forFeature([CreEstado])],
})
export class CreEstadoModule {}
