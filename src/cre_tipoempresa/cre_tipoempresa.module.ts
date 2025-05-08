import { Module } from '@nestjs/common';
import { CreTipoempresaService } from './cre_tipoempresa.service';
import { CreTipoempresaController } from './cre_tipoempresa.controller';
import { CreTipoempresa } from './entities/cre_tipoempresa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [CreTipoempresaController],
	providers: [CreTipoempresaService],
	imports: [
		TypeOrmModule.forFeature([CreTipoempresa]), AuthModule
	]
})
export class CreTipoempresaModule { }
