import { Module } from '@nestjs/common';
import { CreSolicitudverificaciontelefonicaService } from './cre-solicitudverificaciontelefonica.service';
import { CreSolicitudverificaciontelefonicaController } from './cre-solicitudverificaciontelefonica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreSolicitudverificaciontelefonica } from './entities/cre-solicitudverificaciontelefonica.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CreSolicitudverificaciontelefonicaController],
  providers: [CreSolicitudverificaciontelefonicaService],
  imports: [TypeOrmModule.forFeature([CreSolicitudverificaciontelefonica]) , AuthModule],
})
export class CreSolicitudverificaciontelefonicaModule {}
