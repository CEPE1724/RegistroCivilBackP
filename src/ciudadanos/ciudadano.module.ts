import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadanoService } from './ciudadano.service';
import { Ciudadano } from './ciudadano.entity';
import { CiudadanoController } from './ciudadano.controller'; // Asegúrate de importar tu controlador
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';  // Importa el HttpModule

@Module({
  imports: [TypeOrmModule.forFeature([Ciudadano]), AuthModule, HttpModule],
  providers: [CiudadanoService],
  controllers: [CiudadanoController],
  exports: [CiudadanoService],
})
export class CiudadanoModule {}
