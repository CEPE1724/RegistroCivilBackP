import { Module } from '@nestjs/common';
import { ClientesVerificacionTerrenaService } from './clientes-verificacion-terrena.service';
import { ClientesVerificacionTerrenaController } from './clientes-verificacion-terrena.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesVerificacionTerrena } from './entities/clientes-verificacion-terrena.entity';
import { TerrenaGestionDomicilioModule } from '../terrena-gestion-domicilio/terrena-gestion-domicilio.module';

@Module({
  controllers: [ClientesVerificacionTerrenaController],
  providers: [ClientesVerificacionTerrenaService],
  imports: [
	TypeOrmModule.forFeature([ClientesVerificacionTerrena]),
	TerrenaGestionDomicilioModule
  ],
})
export class ClientesVerificacionTerrenaModule {}
