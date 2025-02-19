import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraencuestaService } from './compraencuesta.service';
import { CompraencuestaController } from './compraencuesta.controller';
import { Compraencuesta } from './entities/compraencuesta.entity';
@Module({
  controllers: [CompraencuestaController],
  providers: [CompraencuestaService],
  imports: [
    TypeOrmModule.forFeature([Compraencuesta]),
  ]
})
export class CompraencuestaModule {}
