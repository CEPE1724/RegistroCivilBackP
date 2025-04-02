import { Module } from '@nestjs/common';
import { TerrenaGestionTrabajoService } from './terrena-gestion-trabajo.service';
import { TerrenaGestionTrabajoController } from './terrena-gestion-trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerrenaGestionTrabajo } from './entities/terrena-gestion-trabajo.entity';

@Module({
  controllers: [TerrenaGestionTrabajoController],
  providers: [TerrenaGestionTrabajoService],
  imports:[TypeOrmModule.forFeature([TerrenaGestionTrabajo])]
})
export class TerrenaGestionTrabajoModule {}
