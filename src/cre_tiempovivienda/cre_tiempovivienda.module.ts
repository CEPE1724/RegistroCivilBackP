import { Module } from '@nestjs/common';
import { CreTiempoviviendaService } from './cre_tiempovivienda.service';
import { CreTiempoviviendaController } from './cre_tiempovivienda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreTiempovivienda } from './entities/cre_tiempovivienda.entity';

@Module({
  controllers: [CreTiempoviviendaController],
  providers: [CreTiempoviviendaService],
   imports: [
	  TypeOrmModule.forFeature([CreTiempovivienda]),
	  
   ]
})
export class CreTiempoviviendaModule {}
