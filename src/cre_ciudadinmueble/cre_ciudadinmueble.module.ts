import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreCiudadinmuebleService } from './cre_ciudadinmueble.service';
import { CreCiudadinmuebleController } from './cre_ciudadinmueble.controller';
import { CreCiudadinmueble } from './entities/cre_ciudadinmueble.entity';

@Module({
  controllers: [CreCiudadinmuebleController],
  providers: [CreCiudadinmuebleService],
  imports: [
	  TypeOrmModule.forFeature([CreCiudadinmueble]),
  ]
})
export class CreCiudadinmuebleModule {}
