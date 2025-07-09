import { Module } from '@nestjs/common';
import { ClientesVerificacionTerrenaService } from './clientes-verificacion-terrena.service';
import { ClientesVerificacionTerrenaController } from './clientes-verificacion-terrena.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesVerificacionTerrena } from './entities/clientes-verificacion-terrena.entity';
import { TerrenaGestionDomicilioModule } from '../terrena-gestion-domicilio/terrena-gestion-domicilio.module';
import { AuthModule } from 'src/auth/auth.module';
import { TerrenaGestionDomicilio } from '../terrena-gestion-domicilio/entities/terrena-gestion-domicilio.entity';
import { TerrenaGestionTrabajo } from '../terrena-gestion-trabajo/entities/terrena-gestion-trabajo.entity';

@Module({
  controllers: [ClientesVerificacionTerrenaController],
  providers: [ClientesVerificacionTerrenaService],
  imports: [
	TypeOrmModule.forFeature([ClientesVerificacionTerrena, TerrenaGestionDomicilioModule, TerrenaGestionTrabajo, TerrenaGestionDomicilio]) , AuthModule ,
  ],
})
export class ClientesVerificacionTerrenaModule {}
