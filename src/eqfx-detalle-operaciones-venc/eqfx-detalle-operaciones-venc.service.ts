import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEqfxDetalleOperacionesVencDto } from './dto/create-eqfx-detalle-operaciones-venc.dto';
import { UpdateEqfxDetalleOperacionesVencDto } from './dto/update-eqfx-detalle-operaciones-venc.dto';
import { EqfxDetalleOperacionesVenc } from './entities/eqfx-detalle-operaciones-venc.entity';

@Injectable()
export class EqfxDetalleOperacionesVencService {
  private readonly logger = new Logger('EqfxDetalleOperacionesVencService');
  constructor(
    @InjectRepository(EqfxDetalleOperacionesVenc)
    private readonly eqfxDetalleOperacionesVencRepository: Repository<EqfxDetalleOperacionesVenc>,
  ) {}
  async findAll(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxDetalleOperacionesVencRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
    return `This action returns a #${id} eqfxDetalleOperacionesVenc`;
  }

}
