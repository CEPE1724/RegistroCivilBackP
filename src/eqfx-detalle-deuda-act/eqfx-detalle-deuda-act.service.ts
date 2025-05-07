import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEqfxDetalleDeudaActDto } from './dto/create-eqfx-detalle-deuda-act.dto';
import { UpdateEqfxDetalleDeudaActDto } from './dto/update-eqfx-detalle-deuda-act.dto';
import { EqfxDetalleDeudaAct } from './entities/eqfx-detalle-deuda-act.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EqfxDetalleDeudaActService {
  private readonly logger = new Logger('EqfxDetalleDeudaActService');
  constructor(
    @InjectRepository(EqfxDetalleDeudaAct)
    private readonly eqfxDetalleDeudaActRepository: Repository<EqfxDetalleDeudaAct>,
  ) { }

  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result =await this.eqfxDetalleDeudaActRepository.find({ where: { idEQFX_IdentificacionConsultada }});
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
    return `This action returns a #${id} eqfxDetalleDeudaAct`;
  }

}
