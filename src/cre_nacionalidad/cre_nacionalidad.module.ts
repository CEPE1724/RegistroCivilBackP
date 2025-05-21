import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreNacionalidadService } from './cre_nacionalidad.service';
import { CreNacionalidadController } from './cre_nacionalidad.controller';
import { CreNacionalidad } from './entities/cre_nacionalidad.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CreNacionalidadController],
  providers: [CreNacionalidadService],
  imports: [
	  TypeOrmModule.forFeature([CreNacionalidad]), AuthModule 
  ]
})
export class CreNacionalidadModule {}
