import { Module } from '@nestjs/common';
import { CboRiesgoService } from './cbo-riesgo.service';
import { CboRiesgoController } from './cbo-riesgo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboRiesgoestado } from './entities/cbo-riesgo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CboRiesgoestado])],
  controllers: [CboRiesgoController],
  providers: [CboRiesgoService],
})
export class CboRiesgoModule {}
