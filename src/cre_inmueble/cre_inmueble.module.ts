import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreInmuebleService } from './cre_inmueble.service';
import { CreInmuebleController } from './cre_inmueble.controller';
import { CreInmueble } from './entities/cre_inmueble.entity';

@Module({
  controllers: [CreInmuebleController],
  providers: [CreInmuebleService],
  imports: [
	  TypeOrmModule.forFeature([CreInmueble]),
  ]
})
export class CreInmuebleModule {}
