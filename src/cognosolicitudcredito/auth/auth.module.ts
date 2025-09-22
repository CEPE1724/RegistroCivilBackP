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
import { CognoTrabajo } from '../entities/cognotrabajo.entity';
 import { CognoDeudaEmov } from '../entities/deudaEmov/cognoDeudaEmov.entity';
 import { CognoInfraccion } from '../entities/deudaEmov/cognoInfraccion.entity';
 import { CognoDetalleRubro } from '../entities/deudaEmov/cognoDetalleRubro.entity';
 import { CognoIssfacCertMedico } from '../entities/afiliaciones/cognoIssfacCertMedico.entity';
 import { CognoAfiliacionIess } from '../entities/afiliacion_iess/cognoAfiliacionIess.entity';
 import { CognoAfiliacionIessEmpresa } from '../entities/afiliacion_iess/cognoAfiliacionIessEmpresa.entity';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
    imports: [
       TypeOrmModule.forFeature([Cognosolicitudcredito, CognoPersonaNatural, CognoSolicitudLugarNacimiento ,
         CognoSolicitudNacionalidades , CognoSolicitudProfesiones, CognoTrabajo, CognoDeudaEmov, 
         CognoInfraccion, CognoDetalleRubro, CognoIssfacCertMedico, CognoAfiliacionIess, CognoAfiliacionIessEmpresa])
      ],
  exports: [AuthService]
})
export class AuthModuleCogno {}


