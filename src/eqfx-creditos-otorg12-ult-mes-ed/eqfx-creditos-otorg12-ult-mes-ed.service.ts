import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEqfxCreditosOtorg12UltMesEdDto } from './dto/create-eqfx-creditos-otorg12-ult-mes-ed.dto';
import { UpdateEqfxCreditosOtorg12UltMesEdDto } from './dto/update-eqfx-creditos-otorg12-ult-mes-ed.dto';
import { EqfxCreditosOtorg12UltMesEd } from './entities/eqfx-creditos-otorg12-ult-mes-ed.entity';

@Injectable()
export class EqfxCreditosOtorg12UltMesEdService {
  private readonly logger = new Logger('EqfxCreditosOtorg12UltMesEdService');
  
  constructor(
    @InjectRepository(EqfxCreditosOtorg12UltMesEd)
    private readonly eqfxCreditosOtorg12UltMesEdRepository: Repository<EqfxCreditosOtorg12UltMesEd>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxCreditosOtorg12UltMesEdRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
    return `This action returns a #${id} eqfxCreditosOtorg12UltMesEd`;
  }
}
