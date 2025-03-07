import { Module } from '@nestjs/common';
import { CreTipocalificacionService } from './cre-tipocalificacion.service';
import { CreTipocalificacionController } from './cre-tipocalificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreTipocalificacion } from './entities/cre-tipocalificacion.entity';
@Module({
  controllers: [CreTipocalificacionController],
  providers: [CreTipocalificacionService],
  imports: [
    TypeOrmModule.forFeature([CreTipocalificacion]),
  ]
})
export class CreTipocalificacionModule {}
