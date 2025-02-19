import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreTiempoService } from './cre_tiempo.service';
import { CreTiempoController } from './cre_tiempo.controller';
import { CreTiempo } from './entities/cre_tiempo.entity';

@Module({
  controllers: [CreTiempoController],
  providers: [CreTiempoService],
  imports: [
      TypeOrmModule.forFeature([CreTiempo]),
    ]
     
})
export class CreTiempoModule {}
