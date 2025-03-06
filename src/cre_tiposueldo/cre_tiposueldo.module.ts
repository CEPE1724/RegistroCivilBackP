import { Module } from '@nestjs/common';
import { CreTiposueldoService } from './cre_tiposueldo.service';
import { CreTiposueldoController } from './cre_tiposueldo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreTiposueldo } from './entities/cre_tiposueldo.entity';

@Module({
	controllers: [CreTiposueldoController],
	providers: [CreTiposueldoService],
	imports: [
		TypeOrmModule.forFeature([CreTiposueldo]),
	]
})
export class CreTiposueldoModule { }
