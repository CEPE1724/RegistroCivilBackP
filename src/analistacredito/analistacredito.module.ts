import { Module } from '@nestjs/common';
import { AnalistacreditoService } from './analistacredito.service';
import { AnalistacreditoController } from './analistacredito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analistacredito } from './entities/analistacredito.entity';
@Module({
  controllers: [AnalistacreditoController],
  providers: [AnalistacreditoService],
  imports: [TypeOrmModule.forFeature([Analistacredito])],
})
export class AnalistacreditoModule {}
