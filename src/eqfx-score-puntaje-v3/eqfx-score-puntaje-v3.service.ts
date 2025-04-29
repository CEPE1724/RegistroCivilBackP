import { Injectable, Logger } from '@nestjs/common';
import { CreateEqfxScorePuntajeV3Dto } from './dto/create-eqfx-score-puntaje-v3.dto';
import { UpdateEqfxScorePuntajeV3Dto } from './dto/update-eqfx-score-puntaje-v3.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {EqfxScorePuntajeV3} from './entities/eqfx-score-puntaje-v3.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EqfxScorePuntajeV3Service {
  private readonly logger = new Logger('EqfxScorePuntajeV3Service');
  
  constructor(
    @InjectRepository(EqfxScorePuntajeV3)
    private readonly eqfxResultadoPuntajeV3: Repository<EqfxScorePuntajeV3>,
  ) {}

  findAll() {
    return `This action returns all eqfxScorePuntajeV3`;
  }

  async findOne(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxResultadoPuntajeV3.findOne({ where: { idEQFX_IdentificacionConsultada }});
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
