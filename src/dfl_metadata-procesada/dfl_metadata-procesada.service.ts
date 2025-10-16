import { Injectable, Logger } from '@nestjs/common';
import { CreateDflMetadataProcesadaDto } from './dto/create-dfl_metadata-procesada.dto';
import { UpdateDflMetadataProcesadaDto } from './dto/update-dfl_metadata-procesada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DflMetadataProcesada } from './entities/dfl_metadata-procesada.entity';
@Injectable()
export class DflMetadataProcesadaService {

  private readonly logger = new Logger('DflMetadataProcesadaService');

  constructor(
    @InjectRepository(DflMetadataProcesada)
    private dflMetadataProcesadaRepository: Repository<DflMetadataProcesada>,
  ) {}

  create(createDflMetadataProcesadaDto: CreateDflMetadataProcesadaDto) {
   try {
      const nuevaMetadata = this.dflMetadataProcesadaRepository.create(createDflMetadataProcesadaDto);
      return this.dflMetadataProcesadaRepository.save(nuevaMetadata);
    }
    catch (error) {
      this.logger.error('❌ Error al crear metadata procesada', error.stack);
      throw new Error('Error al crear metadata procesada');
    }
  }

}