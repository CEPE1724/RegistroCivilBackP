import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEqfxidentificacionconsultadaDto } from './dto/create-eqfxidentificacionconsultada.dto';
import { UpdateEqfxidentificacionconsultadaDto } from './dto/update-eqfxidentificacionconsultada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Eqfxidentificacionconsultada } from './entities/eqfxidentificacionconsultada.entity';

@Injectable()
export class EqfxidentificacionconsultadaService {
  private readonly logger = new Logger('CreSolicitudWebService');

  constructor(
    @InjectRepository(Eqfxidentificacionconsultada)
    private readonly eqfxidentificacionconsultadaRepository: Repository<Eqfxidentificacionconsultada>,
  ) { }

  // Método modificado para devolver un mensaje cuando no existe el valor
  async findOne(NumeroDocumento: string) {
    const result = await this.eqfxidentificacionconsultadaRepository.findOne({ where: { NumeroDocumento } });
    if (!result) {
      // Lanzamos una excepción si no se encuentra el documento
      return {
        success: false,
        message: `No se encontró ningún documento con el número: ${NumeroDocumento}`,
      };
    }
    return {
      success: true,
      data: result,
    };
  }

  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error');
  }
}
