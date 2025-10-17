import { Injectable, Logger } from '@nestjs/common';
import { CreateDflIndicadoresAnversoDto } from './dto/create-dfl_indicadores-anverso.dto';
import { UpdateDflIndicadoresAnversoDto } from './dto/update-dfl_indicadores-anverso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DflIndicadoresAnverso } from './entities/dfl_indicadores-anverso.entity';
@Injectable()
export class DflIndicadoresAnversoService {
    private readonly logger = new Logger('DflIndicadoresAnversoService');

    constructor(
        @InjectRepository(DflIndicadoresAnverso)
        private readonly dflIndicadoresAnversoRepository: Repository<DflIndicadoresAnverso>,
    ) { }

  create(createDflIndicadoresAnversoDto: CreateDflIndicadoresAnversoDto) {
    try {
      const nuevoIndicador = this.dflIndicadoresAnversoRepository.create(createDflIndicadoresAnversoDto);
      return this.dflIndicadoresAnversoRepository.save(nuevoIndicador);
    } catch (error) {
      this.logger.error('❌ Error al crear indicador anverso', error.stack);
      throw new Error('Error al crear indicador anverso');
    }
  }

}