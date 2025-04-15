import { Module } from '@nestjs/common';
import { TiemposolicitudeswebService } from './tiemposolicitudesweb.service';
import { TiemposolicitudeswebController } from './tiemposolicitudesweb.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiempoSolicitudesWeb } from './entities/tiemposolicitudesweb.entity';
@Module({
  controllers: [TiemposolicitudeswebController],
  providers: [TiemposolicitudeswebService],
  imports: [
    TypeOrmModule.forFeature([TiempoSolicitudesWeb]),
  ],
})
export class TiemposolicitudeswebModule {}
