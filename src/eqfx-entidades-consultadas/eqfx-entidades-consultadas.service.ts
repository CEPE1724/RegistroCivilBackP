import { Injectable, Logger } from '@nestjs/common';
import { CreateEqfxEntidadesConsultadaDto } from './dto/create-eqfx-entidades-consultada.dto';
import { UpdateEqfxEntidadesConsultadaDto } from './dto/update-eqfx-entidades-consultada.dto';
import { EqfxEntidadesConsultada } from './entities/eqfx-entidades-consultada.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EqfxEntidadesConsultadasService {
  private readonly logger = new Logger('EqfxEntidadesConsultadasService');

  constructor(
    @InjectRepository(EqfxEntidadesConsultada)
    private readonly eqfxEntidadesConsultadaRepository: Repository<EqfxEntidadesConsultada>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxEntidadesConsultadaRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
    return `This action returns a #${id} eqfxEntidadesConsultada`;
  }
}
