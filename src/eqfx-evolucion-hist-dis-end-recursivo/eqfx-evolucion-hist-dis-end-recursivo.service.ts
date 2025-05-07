import { Injectable, Logger } from '@nestjs/common';
import { CreateEqfxEvolucionHistDisEndRecursivoDto } from './dto/create-eqfx-evolucion-hist-dis-end-recursivo.dto';
import { UpdateEqfxEvolucionHistDisEndRecursivoDto } from './dto/update-eqfx-evolucion-hist-dis-end-recursivo.dto';
import { EqfxEvolucionHistDisEndRecursivo } from './entities/eqfx-evolucion-hist-dis-end-recursivo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EqfxEvolucionHistDisEndRecursivoService {
  private readonly logger = new Logger('EqfxEvolucionHistDisEndRecursivoService');
  constructor(
    @InjectRepository(EqfxEvolucionHistDisEndRecursivo)
    private readonly eqfxEvolucionHistDisEndRecursivoRepository: Repository<EqfxEvolucionHistDisEndRecursivo>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxEvolucionHistDisEndRecursivoRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
    return `This action returns a #${id} eqfxEvolucionHistDisEndRecursivo`;
  }
}
