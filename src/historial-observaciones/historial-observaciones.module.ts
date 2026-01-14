import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { HistorialObservacionesService } from './historial-observaciones.service';
import { HistorialObservacionesController } from './historial-observaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialObservaciones } from './entities/historial-observacione.entity';
@Module({
  controllers: [HistorialObservacionesController],
  providers: [HistorialObservacionesService],
  imports: [TypeOrmModule.forFeature([HistorialObservaciones]),
    AuthModule], 
})
export class HistorialObservacionesModule {}
