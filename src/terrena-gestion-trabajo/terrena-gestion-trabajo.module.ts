import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TerrenaGestionTrabajoService } from './terrena-gestion-trabajo.service';
import { TerrenaGestionTrabajoController } from './terrena-gestion-trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerrenaGestionTrabajo } from './entities/terrena-gestion-trabajo.entity';

@Module({
  controllers: [TerrenaGestionTrabajoController],
  providers: [TerrenaGestionTrabajoService],
  imports:[TypeOrmModule.forFeature([TerrenaGestionTrabajo]), AuthModule], // Importa el módulo de autenticación si es necesario
})
export class TerrenaGestionTrabajoModule {}
