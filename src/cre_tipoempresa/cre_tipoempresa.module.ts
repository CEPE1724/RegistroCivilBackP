import { Module } from '@nestjs/common';
import { CreTipoempresaService } from './cre_tipoempresa.service';
import { CreTipoempresaController } from './cre_tipoempresa.controller';
import { CreTipoempresa } from './entities/cre_tipoempresa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	controllers: [CreTipoempresaController],
	providers: [CreTipoempresaService],
	imports: [
		TypeOrmModule.forFeature([CreTipoempresa]),
	]
})
export class CreTipoempresaModule { }
