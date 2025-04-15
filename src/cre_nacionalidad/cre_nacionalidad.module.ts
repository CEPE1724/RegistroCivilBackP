import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreNacionalidadService } from './cre_nacionalidad.service';
import { CreNacionalidadController } from './cre_nacionalidad.controller';
import { CreNacionalidad } from './entities/cre_nacionalidad.entity';

@Module({
  controllers: [CreNacionalidadController],
  providers: [CreNacionalidadService],
  imports: [
	  TypeOrmModule.forFeature([CreNacionalidad]),
  ]
})
export class CreNacionalidadModule {}
