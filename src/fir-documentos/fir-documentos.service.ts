import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateFirDocumentoDto } from './dto/create-fir-documento.dto';
import { UpdateFirDocumentoDto } from './dto/update-fir-documento.dto';
import { FirDocumento } from './entities/fir-documento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()


export class FirDocumentosService {
  private readonly logger = new Logger('FirOperacionFirmaService');

  constructor(
    @InjectRepository(FirDocumento)
    private readonly firDocumentoRepository: Repository<FirDocumento>,
  ) {}

  create(createFirDocumentoDto: CreateFirDocumentoDto) {
    try {
      return this.firDocumentoRepository.save(createFirDocumentoDto);
    }
    catch (error) {
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
