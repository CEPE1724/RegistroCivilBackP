import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEqfxDeudaReportadaRfrDto } from './dto/create-eqfx-deuda-reportada-rfr.dto';
import { UpdateEqfxDeudaReportadaRfrDto } from './dto/update-eqfx-deuda-reportada-rfr.dto';
import { EqfxDeudaReportadaRfr } from './entities/eqfx-deuda-reportada-rfr.entity';

@Injectable()
export class EqfxDeudaReportadaRfrService {
  private readonly logger = new Logger('EqfxDeudaReportadaRfrService');

  constructor(
    @InjectRepository(EqfxDeudaReportadaRfr)
    private readonly eqfxDeudaReportadaRfrRepository: Repository<EqfxDeudaReportadaRfr>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxDeudaReportadaRfrRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
    return `This action returns a #${id} eqfxDeudaReportadaRfr`;
  }
}
