import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TerrenaGestionDomicilioService } from './terrena-gestion-domicilio.service';
import { TerrenaGestionDomicilioController } from './terrena-gestion-domicilio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerrenaGestionDomicilio } from './entities/terrena-gestion-domicilio.entity';


@Module({
  controllers: [TerrenaGestionDomicilioController],
  providers: [TerrenaGestionDomicilioService],
  imports:[TypeOrmModule.forFeature([TerrenaGestionDomicilio]), AuthModule], // Importa el módulo de autenticación si es necesario
  exports:[TypeOrmModule]
})
export class TerrenaGestionDomicilioModule {}
