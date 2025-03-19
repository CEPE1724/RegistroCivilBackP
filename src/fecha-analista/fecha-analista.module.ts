import { Module } from '@nestjs/common';
import { FechaAnalistaService } from './fecha-analista.service';
import { FechaAnalistaController } from './fecha-analista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FechaAnalista } from './entities/fecha-analista.entity';
@Module({
  controllers: [FechaAnalistaController],
  providers: [FechaAnalistaService],
  imports: [TypeOrmModule.forFeature([FechaAnalista])],
})
export class FechaAnalistaModule {}
