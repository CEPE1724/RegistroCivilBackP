import { Module } from '@nestjs/common';
import { CreTipocontratoService } from './cre_tipocontrato.service';
import { CreTipocontratoController } from './cre_tipocontrato.controller';
import { CreTipocontrato } from './entities/cre_tipocontrato.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CreTipocontratoController],
  providers: [CreTipocontratoService],
  imports: [
	TypeOrmModule.forFeature([CreTipocontrato]), AuthModule
  ]
})
export class CreTipocontratoModule {}
