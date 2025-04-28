import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEqfxResultadoSegmentacionDto } from './dto/create-eqfx-resultado-segmentacion.dto';
import { UpdateEqfxResultadoSegmentacionDto } from './dto/update-eqfx-resultado-segmentacion.dto';
import {EqfxResultadoSegmentacion} from './entities/eqfx-resultado-segmentacion.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EqfxResultadoSegmentacionService {
  private readonly logger = new Logger('EqfxResultadoSegmentacionService');

  constructor(
    @InjectRepository(EqfxResultadoSegmentacion)
    private readonly eqfxResultadoSegmentacionRepository: Repository<EqfxResultadoSegmentacion>,
  ) { }

  async findOne(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxResultadoSegmentacionRepository.findOne({ where: { idEQFX_IdentificacionConsultada }});
    if (!result) {
      return {
        success: false,
        message: `No se encontró ningún documento con el id: ${idEQFX_IdentificacionConsultada}`,
      };
    }
    return {
      success: true,
      data: result,
    };
  }
}
