import { Module } from '@nestjs/common';
import { HorariosanalistasService } from './horariosanalistas.service';
import { HorariosanalistasController } from './horariosanalistas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horariosanalista } from './entities/horariosanalista.entity';

@Module({
  controllers: [HorariosanalistasController],
  providers: [HorariosanalistasService],
  imports: [TypeOrmModule.forFeature([Horariosanalista])],
})
export class HorariosanalistasModule {}
