import { Module } from '@nestjs/common';
import { DflMetadataProcesadaService } from './dfl_metadata-procesada.service';
import { DflMetadataProcesadaController } from './dfl_metadata-procesada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DflMetadataProcesada } from './entities/dfl_metadata-procesada.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DflMetadataProcesada])],
  controllers: [DflMetadataProcesadaController],
  providers: [DflMetadataProcesadaService],
})
export class DflMetadataProcesadaModule {}
