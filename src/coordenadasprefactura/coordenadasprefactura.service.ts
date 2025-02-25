import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Coordenadasprefactura } from './entities/coordenadasprefactura.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CoordenadasprefacturaService {

  private readonly logger = new Logger('CoordenadasprefacturaService');

  constructor(
    @InjectRepository(Coordenadasprefactura)
    private readonly coordenadasprefacturaRepository: Repository<Coordenadasprefactura>
  ) { }

  findAll() {
    return this.coordenadasprefacturaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} coordenadasprefactura`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }

}




