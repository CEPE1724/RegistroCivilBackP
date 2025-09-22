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
 import { CognoDeudaEmov } from './entities/deudaEmov/cognoDeudaEmov.entity';
 import { CognoInfraccion } from './entities/deudaEmov/cognoInfraccion.entity';
 import { CognoDetalleRubro } from './entities/deudaEmov/cognoDetalleRubro.entity';
 import { CognoIssfacCertMedico } from './entities/afiliaciones/cognoIssfacCertMedico.entity';
 import { CognoAfiliacionIess } from './entities/afiliacion_iess/cognoAfiliacionIess.entity';
 import { CognoAfiliacionIessEmpresa } from './entities/afiliacion_iess/cognoAfiliacionIessEmpresa.entity';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CognosolicitudcreditoController, AuthController],
  providers: [CognosolicitudcreditoService, AuthService],
  imports: [TypeOrmModule.forFeature([Cognosolicitudcredito, CognoPersonaNatural, CognoSolicitudLugarNacimiento ,
    CognoSolicitudNacionalidades , CognoSolicitudProfesiones, CognoTrabajo, CognoDeudaEmov, 
    CognoInfraccion, CognoDetalleRubro, CognoIssfacCertMedico, CognoAfiliacionIess, CognoAfiliacionIessEmpresa]) , AuthModule],
})
export class CognosolicitudcreditoModule {}
