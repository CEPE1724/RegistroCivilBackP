import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEqfxAnalisisSaldoVencerDto } from './dto/create-eqfx-analisis-saldo-vencer.dto';
import { UpdateEqfxAnalisisSaldoVencerDto } from './dto/update-eqfx-analisis-saldo-vencer.dto';
import { EqfxAnalisisSaldoVencer } from './entities/eqfx-analisis-saldo-vencer.entity';

@Injectable()
export class EqfxAnalisisSaldoVencerService {
  private readonly logger = new Logger('EqfxAnalisisSaldoVencerService');
  
  constructor(
    @InjectRepository(EqfxAnalisisSaldoVencer)
    private readonly eqfxAnalisisSaldoVencerRepository: Repository<EqfxAnalisisSaldoVencer>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxAnalisisSaldoVencerRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
    return `This action returns a #${id} eqfxAnalisisSaldoVencer`;
  }

}
