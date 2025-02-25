// src/credatos-web/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognoPersonaNatural } from '../entities/cognopersonanatural.entity';
import { Cognosolicitudcredito} from '../entities/cognosolicitudcredito.entity';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
    imports: [
       TypeOrmModule.forFeature([Cognosolicitudcredito, CognoPersonaNatural])
      ]
})
export class AuthModuleCogno {}
// src


