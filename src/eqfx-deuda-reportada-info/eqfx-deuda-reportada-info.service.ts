import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEqfxDeudaReportadaInfoDto } from './dto/create-eqfx-deuda-reportada-info.dto';
import { UpdateEqfxDeudaReportadaInfoDto } from './dto/update-eqfx-deuda-reportada-info.dto';
import { EqfxDeudaReportadaInfo } from './entities/eqfx-deuda-reportada-info.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EqfxDeudaReportadaInfoService {
  private readonly logger = new Logger('EqfxDeudaReportadaInfoService');

  constructor(
    @InjectRepository(EqfxDeudaReportadaInfo)
    private readonly eqfxDeudaReportadaInfoRepository: Repository<EqfxDeudaReportadaInfo>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxDeudaReportadaInfoRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
    return `This action returns a #${id} eqfxDeudaReportadaInfo`;
  }
}
