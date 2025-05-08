import { Module } from '@nestjs/common';
import { CreTiposueldoService } from './cre_tiposueldo.service';
import { CreTiposueldoController } from './cre_tiposueldo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreTiposueldo } from './entities/cre_tiposueldo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [CreTiposueldoController],
	providers: [CreTiposueldoService],
	imports: [
		TypeOrmModule.forFeature([CreTiposueldo]), AuthModule
	]
})
export class CreTiposueldoModule { }
