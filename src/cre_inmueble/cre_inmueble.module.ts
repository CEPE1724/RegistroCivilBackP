import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreInmuebleService } from './cre_inmueble.service';
import { CreInmuebleController } from './cre_inmueble.controller';
import { CreInmueble } from './entities/cre_inmueble.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CreInmuebleController],
  providers: [CreInmuebleService],
  imports: [
	  TypeOrmModule.forFeature([CreInmueble]), AuthModule
  ]
})
export class CreInmuebleModule {}
