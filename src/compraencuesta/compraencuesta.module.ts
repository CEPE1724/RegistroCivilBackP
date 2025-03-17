import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraencuestaService } from './compraencuesta.service';
import { CompraencuestaController } from './compraencuesta.controller';
import { Compraencuesta } from './entities/compraencuesta.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
  controllers: [CompraencuestaController],
  providers: [CompraencuestaService],
  imports: [
    TypeOrmModule.forFeature([Compraencuesta]),
    AuthModule,
  ]
})
export class CompraencuestaModule {}
