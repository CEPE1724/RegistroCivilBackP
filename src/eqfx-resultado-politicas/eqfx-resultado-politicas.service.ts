import { Injectable, Logger } from '@nestjs/common';
import { CreateEqfxResultadoPoliticaDto } from './dto/create-eqfx-resultado-politica.dto';
import { UpdateEqfxResultadoPoliticaDto } from './dto/update-eqfx-resultado-politica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {EqfxResultadoPolitica} from './entities/eqfx-resultado-politica.entity';

@Injectable()
export class EqfxResultadoPoliticasService {
  private readonly logger = new Logger('EqfxResultadoPoliticasService');

  constructor(
    @InjectRepository(EqfxResultadoPolitica)
    private readonly eqfxResultadoPoliticaRepository: Repository<EqfxResultadoPolitica>,
  ) {}

  findAll() {
    return `This action returns all eqfxResultadoPoliticas`;
  }

  async findOne(idEQFX_IdentificacionConsultada: number) {
    const result = await this.eqfxResultadoPoliticaRepository.findOne({ where: { idEQFX_IdentificacionConsultada }});
    if (!result) {
      return {
        success: false,
        message: `No se encontró ningún documento con el id: ${idEQFX_IdentificacionConsultada}`,
      };
    }
    return {
      success: true,
      data: result,
    };
  }
}
