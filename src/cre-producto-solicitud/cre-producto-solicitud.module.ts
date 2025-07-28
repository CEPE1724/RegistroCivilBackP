import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreProductoSolicitudService } from './cre-producto-solicitud.service';
import { CreProductoSolicitudController } from './cre-producto-solicitud.controller';
import { CreProductoSolicitud } from './entities/cre-producto-solicitud.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreProductoSolicitud])],
  controllers: [CreProductoSolicitudController],
  providers: [CreProductoSolicitudService],
})
export class CreProductoSolicitudModule {}
