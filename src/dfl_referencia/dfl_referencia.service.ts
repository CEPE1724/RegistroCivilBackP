import { Injectable, Logger } from '@nestjs/common';
import { CreateDflReferenciaDto } from './dto/create-dfl_referencia.dto';
import { UpdateDflReferenciaDto } from './dto/update-dfl_referencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DflReferencia } from './entities/dfl_referencia.entity';
@Injectable()
export class DflReferenciaService {
  private readonly logger = new Logger('DflReferenciaService');

  constructor(
    @InjectRepository(DflReferencia)
    private dflReferenciaRepository: Repository<DflReferencia>,
  ) {}

  create(createDflReferenciaDto: CreateDflReferenciaDto) {
    try {
      const nuevaReferencia = this.dflReferenciaRepository.create(createDflReferenciaDto);
      return this.dflReferenciaRepository.save(nuevaReferencia);
    }
    catch (error) {
      this.logger.error('❌ Error al crear referencia', error.stack);
      throw new Error('Error al crear referencia');
    }
  }

}