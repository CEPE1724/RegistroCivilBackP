import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEqfxEvolucionHistDisEndeudamientoDto } from './dto/create-eqfx-evolucion-hist-dis-endeudamiento.dto';
import { UpdateEqfxEvolucionHistDisEndeudamientoDto } from './dto/update-eqfx-evolucion-hist-dis-endeudamiento.dto';
import { EqfxEvolucionHistDisEndeudamiento } from './entities/eqfx-evolucion-hist-dis-endeudamiento.entity';

@Injectable()
export class EqfxEvolucionHistDisEndeudamientoService {
  private readonly logger = new Logger('EqfxEvolucionHistDisEndeudamientoService');

  constructor(
    @InjectRepository(EqfxEvolucionHistDisEndeudamiento)
    private readonly eqfxEvolucionHistDisEndeudamientoRepository: Repository<EqfxEvolucionHistDisEndeudamiento>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxEvolucionHistDisEndeudamientoRepository.find({ where: { idEQFX_IdentificacionConsultada } });
    if (!result) {
      return {
        success: false,
        message: `No se encontró ningún documento`,
      };
    }
    return {
      success: true,
      data: result,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} eqfxEvolucionHistDisEndeudamiento`;
  }
}
