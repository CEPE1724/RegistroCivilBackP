import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TiemposolicitudeswebService } from './tiemposolicitudesweb.service';
import { TiemposolicitudeswebController } from './tiemposolicitudesweb.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiempoSolicitudesWeb } from './entities/tiemposolicitudesweb.entity';
@Module({
  controllers: [TiemposolicitudeswebController],
  providers: [TiemposolicitudeswebService],
  imports: [
    TypeOrmModule.forFeature([TiempoSolicitudesWeb]),
    AuthModule, // Importa el módulo de autenticación si es necesario
  ],
})
export class TiemposolicitudeswebModule {}
