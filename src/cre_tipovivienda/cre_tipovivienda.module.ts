import { Module } from '@nestjs/common';
import { CreTipoviviendaService } from './cre_tipovivienda.service';
import { CreTipoviviendaController } from './cre_tipovivienda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreTipovivienda } from './entities/cre_tipovivienda.entity';

@Module({
  controllers: [CreTipoviviendaController],
  providers: [CreTipoviviendaService],
   imports: [
	  TypeOrmModule.forFeature([CreTipovivienda]),
	  
   ]
})
export class CreTipoviviendaModule {}
