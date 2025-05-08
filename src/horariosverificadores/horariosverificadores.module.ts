import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { HorariosverificadoresService } from './horariosverificadores.service';
import { HorariosverificadoresController } from './horariosverificadores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horariosverificadores } from './entities/horariosverificadores.entity';

@Module({
  controllers: [HorariosverificadoresController],
  providers: [HorariosverificadoresService],
  imports: [TypeOrmModule.forFeature([Horariosverificadores]),
    AuthModule],
})
export class HorariosverificadoresModule {}
