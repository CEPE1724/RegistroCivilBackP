import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreCiudadinmuebleService } from './cre_ciudadinmueble.service';
import { CreCiudadinmuebleController } from './cre_ciudadinmueble.controller';
import { CreCiudadinmueble } from './entities/cre_ciudadinmueble.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CreCiudadinmuebleController],
  providers: [CreCiudadinmuebleService],
  imports: [
	  TypeOrmModule.forFeature([CreCiudadinmueble]), AuthModule
  ]
})
export class CreCiudadinmuebleModule {}
