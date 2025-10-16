import { Injectable, Logger } from '@nestjs/common';
import { CreateDflAnalisisBiometricoDto } from './dto/create-dfl_analisis-biometrico.dto';
import { UpdateDflAnalisisBiometricoDto } from './dto/update-dfl_analisis-biometrico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DflAnalisisBiometrico } from './entities/dfl_analisis-biometrico.entity';


@Injectable()
export class DflAnalisisBiometricoService {
  private readonly logger = new Logger('DflAnalisisBiometricoService');

  constructor(
    @InjectRepository(DflAnalisisBiometrico)
    private readonly dflAnalisisBiometricoRepository: Repository<DflAnalisisBiometrico>,
  ) { }
  create(createDflAnalisisBiometricoDto: CreateDflAnalisisBiometricoDto) {
    try {
      const nuevoAnalisis = this.dflAnalisisBiometricoRepository.create(createDflAnalisisBiometricoDto);
      return this.dflAnalisisBiometricoRepository.save(nuevoAnalisis);
    } catch (error) {
      this.logger.error('❌ Error al crear análisis biométrico', error.stack);
      throw new Error('Error al crear análisis biométrico');
    }
  }


}