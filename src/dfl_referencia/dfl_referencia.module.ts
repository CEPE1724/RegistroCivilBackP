import { Module } from '@nestjs/common';
import { DflReferenciaService } from './dfl_referencia.service';
import { DflReferenciaController } from './dfl_referencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DflReferencia } from './entities/dfl_referencia.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DflReferencia])],
  controllers: [DflReferenciaController],
  providers: [DflReferenciaService],
})
export class DflReferenciaModule {}
