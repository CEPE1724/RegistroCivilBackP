import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { Compra } from './entities/compra.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CompraController],
  providers: [CompraService],
  imports: [TypeOrmModule.forFeature([Compra]), AuthModule ],
  exports: [CompraService] 
})
export class CompraModule {}