import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { EstadoSolicitudService } from './estado-solicitud.service';
import { EstadoSolicitudController } from './estado-solicitud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoSolicitud } from './entities/estado-solicitud.entity';

@Module({
  controllers: [EstadoSolicitudController],
  providers: [EstadoSolicitudService],
  imports: [TypeOrmModule.forFeature([EstadoSolicitud]), AuthModule],
})
export class EstadoSolicitudModule {}
