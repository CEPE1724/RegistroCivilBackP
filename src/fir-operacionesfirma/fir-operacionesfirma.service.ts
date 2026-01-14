import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateFirOperacionesfirmaDto } from './dto/create-fir-operacionesfirma.dto';
import { UpdateFirOperacionesfirmaDto } from './dto/update-fir-operacionesfirma.dto';
import { FirOperacionesfirma } from './entities/fir-operacionesfirma.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FirOperacionesfirmaService {
  private readonly logger = new Logger('FirOperacionFirmaService');
  constructor(
    @InjectRepository(FirOperacionesfirma)
    private readonly firOperacionFirmaRepository: Repository<FirOperacionesfirma>,
  ) { }

  async create(createFirOperacionesfirmaDto: CreateFirOperacionesfirmaDto) {
    try {
      return await this.firOperacionFirmaRepository.save(createFirOperacionesfirmaDto);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    this.logger.error(error);
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}
