import { Module } from '@nestjs/common';
import { CreEstadoService } from './cre-estado.service';
import { CreEstadoController } from './cre-estado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreEstado } from './entities/cre-estado.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [CreEstadoController],
  providers: [CreEstadoService],
  imports: [TypeOrmModule.forFeature([CreEstado]), AuthModule],
})
export class CreEstadoModule {}
