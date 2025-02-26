// src/credatos-web/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognoPersonaNatural } from '../entities/cognopersonanatural.entity';
import { Cognosolicitudcredito} from '../entities/cognosolicitudcredito.entity';
import { CognoSolicitudLugarNacimiento } from '../entities/cognosolicitudlugarnacimiento.entity';
import { CognoSolicitudNacionalidades } from '../entities/cognosolicitudnacionalidades.entity';
import { CognoSolicitudProfesiones } from '../entities/cognosolicitudprofesiones.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
    imports: [
       TypeOrmModule.forFeature([Cognosolicitudcredito, CognoPersonaNatural, CognoSolicitudLugarNacimiento , CognoSolicitudNacionalidades , CognoSolicitudProfesiones])
      ]
})
export class AuthModuleCogno {}


