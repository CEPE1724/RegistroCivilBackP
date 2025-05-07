import { Injectable, Logger } from '@nestjs/common';
import { CreateEqfxInfoPosteriorFechaCorteDto } from './dto/create-eqfx-info-posterior-fecha-corte.dto';
import { UpdateEqfxInfoPosteriorFechaCorteDto } from './dto/update-eqfx-info-posterior-fecha-corte.dto';
import { EqfxInfoPosteriorFechaCorte } from './entities/eqfx-info-posterior-fecha-corte.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EqfxInfoPosteriorFechaCorteService {
  private readonly logger = new Logger('EqfxInfoPosteriorFechaCorteService');

  constructor(
    @InjectRepository(EqfxInfoPosteriorFechaCorte)
    private readonly eqfxInfoPosteriorFechaCorteRepository: Repository<EqfxInfoPosteriorFechaCorte>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxInfoPosteriorFechaCorteRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
    return `This action returns a #${id} eqfxInfoPosteriorFechaCorte`;
  }

}
