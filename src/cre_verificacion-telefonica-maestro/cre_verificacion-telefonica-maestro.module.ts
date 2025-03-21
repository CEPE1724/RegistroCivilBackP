import { Module } from '@nestjs/common';
import { CreVerificacionTelefonicaMaestroService } from './cre_verificacion-telefonica-maestro.service';
import { CreVerificacionTelefonicaMaestroController } from './cre_verificacion-telefonica-maestro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreVerificacionTelefonicaMaestro } from './entities/cre_verificacion-telefonica-maestro.entity'

@Module({
  controllers: [CreVerificacionTelefonicaMaestroController],
  providers: [CreVerificacionTelefonicaMaestroService],
  imports: [
    TypeOrmModule.forFeature([CreVerificacionTelefonicaMaestro])
  ]
})
export class CreVerificacionTelefonicaMaestroModule {}
