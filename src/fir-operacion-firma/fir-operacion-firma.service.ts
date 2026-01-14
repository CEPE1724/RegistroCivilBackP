import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateFirOperacionFirmaDto } from './dto/create-fir-operacion-firma.dto';
import { UpdateFirOperacionFirmaDto } from './dto/update-fir-operacion-firma.dto';
import { FirOperacionFirma } from './entities/fir-operacion-firma.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class FirOperacionFirmaService {
  private readonly logger = new Logger('FirOperacionFirmaService');
  constructor(
    @InjectRepository(FirOperacionFirma)
    private readonly firOperacionFirmaRepository: Repository<FirOperacionFirma>
  ) { }

 async create(createFirOperacionFirmaDto: CreateFirOperacionFirmaDto): Promise<FirOperacionFirma> {
    try {
      const operacion = await this.firOperacionFirmaRepository.save(createFirOperacionFirmaDto);
      return operacion;
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