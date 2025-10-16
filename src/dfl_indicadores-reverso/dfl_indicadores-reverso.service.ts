import { Injectable, Logger } from '@nestjs/common';
import { CreateDflIndicadoresReversoDto } from './dto/create-dfl_indicadores-reverso.dto';
import { UpdateDflIndicadoresReversoDto } from './dto/update-dfl_indicadores-reverso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DflIndicadoresReverso } from './entities/dfl_indicadores-reverso.entity';

@Injectable()
export class DflIndicadoresReversoService {
   private readonly logger = new Logger('DflIndicadoresReversoService');

   constructor(
       @InjectRepository(DflIndicadoresReverso)
       private readonly dflIndicadoresReversoRepository: Repository<DflIndicadoresReverso>,
   ) { }
   
  create(createDflIndicadoresReversoDto: CreateDflIndicadoresReversoDto) {
    try {
      const nuevoIndicador = this.dflIndicadoresReversoRepository.create(createDflIndicadoresReversoDto);
      return this.dflIndicadoresReversoRepository.save(nuevoIndicador);
    } catch (error) {
      this.logger.error('❌ Error al crear indicador reverso', error.stack);
      throw new Error('Error al crear indicador reverso');
    }
  }
}
