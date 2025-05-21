import { Module } from '@nestjs/common';
import { CreTipoviviendaService } from './cre_tipovivienda.service';
import { CreTipoviviendaController } from './cre_tipovivienda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreTipovivienda } from './entities/cre_tipovivienda.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CreTipoviviendaController],
  providers: [CreTipoviviendaService],
   imports: [
	  TypeOrmModule.forFeature([CreTipovivienda]), AuthModule
	  
   ]
})
export class CreTipoviviendaModule {}
