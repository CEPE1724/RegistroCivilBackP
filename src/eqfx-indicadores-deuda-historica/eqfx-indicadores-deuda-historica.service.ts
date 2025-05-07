import { Injectable, Logger } from '@nestjs/common';
import { CreateEqfxIndicadoresDeudaHistoricaDto } from './dto/create-eqfx-indicadores-deuda-historica.dto';
import { UpdateEqfxIndicadoresDeudaHistoricaDto } from './dto/update-eqfx-indicadores-deuda-historica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EqfxIndicadoresDeudaHistorica } from './entities/eqfx-indicadores-deuda-historica.entity';

@Injectable()
export class EqfxIndicadoresDeudaHistoricaService {
  private readonly logger = new Logger('EqfxIndicadoresDeudaHistoricaService');

  constructor(
    @InjectRepository(EqfxIndicadoresDeudaHistorica)
    private readonly eqfxIndicadoresDeudaHistoricaRepository: Repository<EqfxIndicadoresDeudaHistorica>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result =await this.eqfxIndicadoresDeudaHistoricaRepository.find({ where: { idEQFX_IdentificacionConsultada }});
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
    return `This action returns a #${id} eqfxIndicadoresDeudaHistorica`;
  }

  
}
