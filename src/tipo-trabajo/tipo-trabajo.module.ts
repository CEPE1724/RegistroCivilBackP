import { Module } from '@nestjs/common';
import { TipoTrabajoService } from './tipo-trabajo.service';
import { TipoTrabajoController } from './tipo-trabajo.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTrabajo } from './entities/tipo-trabajo.entity';

@Module({
  controllers: [TipoTrabajoController],
  providers: [TipoTrabajoService],
  imports: [
    TypeOrmModule.forFeature([TipoTrabajo]),
  ]
})
export class TipoTrabajoModule {}
