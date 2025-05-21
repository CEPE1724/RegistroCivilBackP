import { Module } from '@nestjs/common';
import { VerificadorcreditoService } from './verificadorcredito.service';
import { VerificadorcreditoController } from './verificadorcredito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificadorCredito } from './entities/verificadorcredito.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [VerificadorcreditoController],
  providers: [VerificadorcreditoService],
  imports: [TypeOrmModule.forFeature([VerificadorCredito]), AuthModule],

})
export class VerificadorcreditoModule {}
