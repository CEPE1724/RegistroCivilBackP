import { Module } from '@nestjs/common';
import { CboRiesgosService } from './cbo-riesgos.service';
import { CboRiesgosController } from './cbo-riesgos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboRiesgo } from './entities/cbo-riesgo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CboRiesgo])],
  controllers: [CboRiesgosController],
  providers: [CboRiesgosService],
})
export class CboRiesgosModule {}
