import { Module } from '@nestjs/common';
import { DflResultadoService } from './dfl_resultado.service';
import { DflResultadoController } from './dfl_resultado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DflResultado } from './entities/dfl_resultado.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DflResultado])],
  controllers: [DflResultadoController],
  providers: [DflResultadoService],
})
export class DflResultadoModule {}
