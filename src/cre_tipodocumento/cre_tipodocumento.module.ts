import { Module } from '@nestjs/common';
import { CreTipodocumentoService } from './cre_tipodocumento.service';
import { CreTipodocumentoController } from './cre_tipodocumento.controller';
import { CreTipodocumento } from './entities/cre_tipodocumento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [CreTipodocumentoController],
  providers: [CreTipodocumentoService],
  imports: [
    TypeOrmModule.forFeature([CreTipodocumento]),
  ]
})
export class CreTipodocumentoModule {}



