import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEqfxPerfilRiesgoDirecDto } from './dto/create-eqfx-perfil-riesgo-direc.dto';
import { UpdateEqfxPerfilRiesgoDirecDto } from './dto/update-eqfx-perfil-riesgo-direc.dto';
import { EqfxPerfilRiesgoDirec } from './entities/eqfx-perfil-riesgo-direc.entity';

@Injectable()
export class EqfxPerfilRiesgoDirecService {
  private readonly logger = new Logger('EqfxPerfilRiesgoDirecService');
  constructor(
    @InjectRepository(EqfxPerfilRiesgoDirec)
    private readonly eqfxPerfilRiesgoDirecRepository: Repository<EqfxPerfilRiesgoDirec>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxPerfilRiesgoDirecRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
    return `This action returns a #${id} eqfxPerfilRiesgoDirec`;
  }

}
