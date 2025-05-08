import { Module } from '@nestjs/common';
import { CreVerificacionTelefonicaService } from './cre_verificacion-telefonica.service';
import { CreVerificacionTelefonicaController } from './cre_verificacion-telefonica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cre_VerificacionTelefonica } from './entities/cre_verificacion-telefonica.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [CreVerificacionTelefonicaController],
  providers: [CreVerificacionTelefonicaService],
  imports: [
    TypeOrmModule.forFeature([Cre_VerificacionTelefonica]), AuthModule
  ]
})
export class CreVerificacionTelefonicaModule {}



