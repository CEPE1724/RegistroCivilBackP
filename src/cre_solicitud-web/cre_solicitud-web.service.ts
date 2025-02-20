import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CreateCreSolicitudWebDto } from './dto/create-cre_solicitud-web.dto';
import { UpdateCreSolicitudWebDto } from './dto/update-cre_solicitud-web.dto';
import { CreSolicitudWeb } from './entities/cre_solicitud-web.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreSolicitudWebService {

  private readonly logger = new Logger('CreSolicitudWebService');

  constructor(
    @InjectRepository(CreSolicitudWeb)
    private readonly creSolicitudWebRepository: Repository<CreSolicitudWeb>
  ) { }

  async create(createCreSolicitudWebDto: CreateCreSolicitudWebDto) {

    try {
       const creSolicitudWeb = this.creSolicitudWebRepository.create(createCreSolicitudWebDto);
       await this.creSolicitudWebRepository.save(creSolicitudWeb);
        return creSolicitudWeb;
    } catch (error) {
        this.handleDBException(error);
    }
  }

  findAll() {
    return this.creSolicitudWebRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} creSolicitudWeb`;
  }

  update(id: number, updateCreSolicitudWebDto: UpdateCreSolicitudWebDto) {
    return `This action updates a #${id} creSolicitudWeb`;
  }

  remove(id: number) {
    return `This action removes a #${id} creSolicitudWeb`;
  }

  private handleDBException(error: any) {
     if(error.code === '23505') {
         throw new BadRequestException(error.detail);
        }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error');

  }
}
