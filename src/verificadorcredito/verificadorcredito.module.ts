import { Module } from '@nestjs/common';
import { VerificadorcreditoService } from './verificadorcredito.service';
import { VerificadorcreditoController } from './verificadorcredito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificadorCredito } from './entities/verificadorcredito.entity';

@Module({
  controllers: [VerificadorcreditoController],
  providers: [VerificadorcreditoService],
  imports: [TypeOrmModule.forFeature([VerificadorCredito])],
})
export class VerificadorcreditoModule {}
