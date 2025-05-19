import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCreReferenciasclienteswebDto } from './dto/create-cre-referenciasclientesweb.dto';
import { UpdateCreReferenciasclienteswebDto } from './dto/update-cre-referenciasclientesweb.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreReferenciasclientesweb } from './entities/cre-referenciasclientesweb.entity';
@Injectable()
export class CreReferenciasclienteswebService {

  private readonly logger = new Logger('CreReferenciasclienteswebService');

  constructor(
    @InjectRepository(CreReferenciasclientesweb)
    private creReferenciasclienteswebRepository: Repository<CreReferenciasclientesweb>,
  ) { }


  create(createCreReferenciasclienteswebDto: CreateCreReferenciasclienteswebDto) {
    return this.creReferenciasclienteswebRepository.save(createCreReferenciasclienteswebDto);
  }

  findAll(idsolicitud: string) {
    return this.creReferenciasclienteswebRepository.find(
      {
        where: {
          idCre_SolicitudWeb: idsolicitud,
        }
      }
    );
  }

  async findAllCount(idsolicitud: string) {
    const count = await this.creReferenciasclienteswebRepository.count(
      {
        where: {
          idCre_SolicitudWeb: idsolicitud,
        }
      }
    );
    return count || 0;
  }


  findOne(id: string) {
    return this.creReferenciasclienteswebRepository.findOne(
      {
        where: {
          idCre_SolicitudWeb: id,
        }
      }
    );
  }


  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error');

  }
}
