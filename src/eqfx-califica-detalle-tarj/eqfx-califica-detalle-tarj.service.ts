import { Injectable, Logger } from '@nestjs/common';
import { CreateEqfxCalificaDetalleTarjDto } from './dto/create-eqfx-califica-detalle-tarj.dto';
import { UpdateEqfxCalificaDetalleTarjDto } from './dto/update-eqfx-califica-detalle-tarj.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EqfxCalificaDetalleTarj } from './entities/eqfx-califica-detalle-tarj.entity';

@Injectable()
export class EqfxCalificaDetalleTarjService {
  private readonly logger = new Logger('EqfxCalificaDetalleTarjService');
  constructor(
    @InjectRepository(EqfxCalificaDetalleTarj)
    private readonly eqfxCalificaDetalleTarjRepository: Repository<EqfxCalificaDetalleTarj>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxCalificaDetalleTarjRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
    return `This action returns a #${id} eqfxCalificaDetalleTarj`;
  }

}
