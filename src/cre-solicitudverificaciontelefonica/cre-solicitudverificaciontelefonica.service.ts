import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository } from 'typeorm';
import { CreateCreSolicitudverificaciontelefonicaDto } from './dto/create-cre-solicitudverificaciontelefonica.dto';
import { UpdateCreSolicitudverificaciontelefonicaDto } from './dto/update-cre-solicitudverificaciontelefonica.dto';
import { CreSolicitudverificaciontelefonica } from './entities/cre-solicitudverificaciontelefonica.entity';

@Injectable()
export class CreSolicitudverificaciontelefonicaService {
  private readonly logger = new Logger('CreSolicitudWebService');

  constructor(
    @InjectRepository(CreSolicitudverificaciontelefonica)
    private readonly creSolicitudverificaciontelefonicaRepository: Repository<CreSolicitudverificaciontelefonica>,
  ) { }

  async create(createCreSolicitudverificaciontelefonicaDto: CreateCreSolicitudverificaciontelefonicaDto) {
    return this.creSolicitudverificaciontelefonicaRepository.save(createCreSolicitudverificaciontelefonicaDto).catch((error) => {
      this.handleDBException(error);
    }
    );
  }

  findAll() {
    return this.creSolicitudverificaciontelefonicaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} creSolicitudverificaciontelefonica`;
  }

  update(id: number, updateCreSolicitudverificaciontelefonicaDto: UpdateCreSolicitudverificaciontelefonicaDto) {
    return `This action updates a #${id} creSolicitudverificaciontelefonica`;
  }

  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error');

  }
}
