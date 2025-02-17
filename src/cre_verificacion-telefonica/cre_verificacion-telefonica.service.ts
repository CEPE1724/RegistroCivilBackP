import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cre_VerificacionTelefonica } from './entities/cre_verificacion-telefonica.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CreVerificacionTelefonicaService {

  private readonly logger = new Logger('Cre_VerificacionTelefonica');
    constructor(
      @InjectRepository(Cre_VerificacionTelefonica)
      private readonly cre_verificaciontelefonicaRepository: Repository<Cre_VerificacionTelefonica>
    ) { }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return   this.cre_verificaciontelefonicaRepository.find({
      take: limit,
      skip: offset,
    });
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException (error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }

}
