import { Module } from '@nestjs/common';
import { CreTipodocumentoService } from './cre_tipodocumento.service';
import { CreTipodocumentoController } from './cre_tipodocumento.controller';
import { CreTipodocumento } from './entities/cre_tipodocumento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [CreTipodocumentoController],
  providers: [CreTipodocumentoService],
  imports: [
    TypeOrmModule.forFeature([CreTipodocumento]), AuthModule
  ]
})
export class CreTipodocumentoModule {}



