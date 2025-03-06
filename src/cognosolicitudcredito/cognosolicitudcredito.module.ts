import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognosolicitudcreditoService } from './cognosolicitudcredito.service';
import { CognosolicitudcreditoController } from './cognosolicitudcredito.controller';
import { Cognosolicitudcredito } from './entities/cognosolicitudcredito.entity';
import { CognoPersonaNatural } from './entities/cognopersonanatural.entity';
import { CognoSolicitudLugarNacimiento } from './entities/cognosolicitudlugarnacimiento.entity';
import { CognoSolicitudNacionalidades } from './entities/cognosolicitudnacionalidades.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { CognoSolicitudProfesiones } from './entities/cognosolicitudprofesiones.entity';
import { CognoTrabajo } from './entities/cognotrabajo.entity';

@Module({
  controllers: [CognosolicitudcreditoController, AuthController],
  providers: [CognosolicitudcreditoService, AuthService],
  imports: [TypeOrmModule.forFeature([Cognosolicitudcredito, CognoPersonaNatural, CognoSolicitudLugarNacimiento , 
    CognoSolicitudNacionalidades , CognoSolicitudProfesiones, CognoTrabajo])],
})
export class CognosolicitudcreditoModule {}
