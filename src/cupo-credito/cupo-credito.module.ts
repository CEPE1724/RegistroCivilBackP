import { Module } from '@nestjs/common';
import { CupoCreditoService } from './cupo-credito.service';
import { CupoCreditoController } from './cupo-credito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CupoCredito } from './entities/cupo-credito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CupoCredito])],
  controllers: [CupoCreditoController],
  providers: [CupoCreditoService],
  exports: [CupoCreditoService],
})
export class CupoCreditoModule {}
