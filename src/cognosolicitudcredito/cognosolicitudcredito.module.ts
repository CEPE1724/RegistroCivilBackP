import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognosolicitudcreditoService } from './cognosolicitudcredito.service';
import { CognosolicitudcreditoController } from './cognosolicitudcredito.controller';
import { Cognosolicitudcredito } from './entities/cognosolicitudcredito.entity';
import { CognoPersonaNatural } from './entities/cognopersonanatural.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  controllers: [CognosolicitudcreditoController, AuthController],
  providers: [CognosolicitudcreditoService, AuthService],
  imports: [TypeOrmModule.forFeature([Cognosolicitudcredito, CognoPersonaNatural])],
})
export class CognosolicitudcreditoModule {}
