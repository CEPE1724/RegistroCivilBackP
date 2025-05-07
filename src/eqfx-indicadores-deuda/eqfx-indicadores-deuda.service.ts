import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEqfxIndicadoresDeudaDto } from './dto/create-eqfx-indicadores-deuda.dto';
import { UpdateEqfxIndicadoresDeudaDto } from './dto/update-eqfx-indicadores-deuda.dto';
import { EqfxIndicadoresDeuda } from './entities/eqfx-indicadores-deuda.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EqfxIndicadoresDeudaService {
  private readonly logger = new Logger('EqfxIndicadoresDeudaService');

  constructor(
    @InjectRepository(EqfxIndicadoresDeuda)
    private readonly eqfxIndicadoresDeudaRepository: Repository<EqfxIndicadoresDeuda>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result =await this.eqfxIndicadoresDeudaRepository.find({ where: { idEQFX_IdentificacionConsultada }});
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
    return `This action returns a #${id} eqfxIndicadoresDeuda`;
  }

}
