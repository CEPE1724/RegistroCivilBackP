import { Module } from '@nestjs/common';
import { CreverificaciontelefonicaService } from './creverificaciontelefonica.service';
import { CreverificaciontelefonicaController } from './creverificaciontelefonica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creverificaciontelefonica } from './entities/creverificaciontelefonica.entity';
@Module({
  controllers: [CreverificaciontelefonicaController],
  providers: [CreverificaciontelefonicaService],
  imports: [TypeOrmModule.forFeature([Creverificaciontelefonica])],
})
export class CreverificaciontelefonicaModule {}
