import { Injectable, Logger } from '@nestjs/common';
import { CreateDflResultadoDto } from './dto/create-dfl_resultado.dto';
import { UpdateDflResultadoDto } from './dto/update-dfl_resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DflResultado } from './entities/dfl_resultado.entity';
@Injectable()
export class DflResultadoService {
  private readonly logger = new Logger('DflResultadoService');

  constructor(
    @InjectRepository(DflResultado)
    private readonly dflResultadoRepository: Repository<DflResultado>,
  ) {}

  create(createDflResultadoDto: CreateDflResultadoDto) {
   try {
      const nuevoResultado = this.dflResultadoRepository.create(createDflResultadoDto);
      return this.dflResultadoRepository.save(nuevoResultado);
    } catch (error) { 
      this.logger.error('❌ Error al crear resultado DFL', error.stack);
      throw new Error('Error al crear resultado DFL');
    }
  }

}

 