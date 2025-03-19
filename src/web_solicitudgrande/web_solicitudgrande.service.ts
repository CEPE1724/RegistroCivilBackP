import {
  BadRequestException, Injectable,
  InternalServerErrorException,
  Logger, NotFoundException
} from '@nestjs/common';

import { CreateWebSolicitudgrandeDto } from './dto/create-web_solicitudgrande.dto';
import { UpdateWebSolicitudgrandeDto } from './dto/update-web_solicitudgrande.dto';
import { WebSolicitudgrande } from './entities/web_solicitudgrande.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class WebSolicitudgrandeService {
  private readonly logger = new Logger('AuthServiceCogno');

  constructor(
    @InjectRepository(WebSolicitudgrande)
    private webSolicitudgrandeRepository: Repository<WebSolicitudgrande>,
  ) {}

  create(createWebSolicitudgrandeDto: CreateWebSolicitudgrandeDto) {
    try {
      const newSolicitud = this.webSolicitudgrandeRepository.create(createWebSolicitudgrandeDto);
      return this.webSolicitudgrandeRepository.save(newSolicitud);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException('Error en el servidor');
    }
  }
   
  findAll() {
    return `This action returns all webSolicitudgrande`;
  }

  findOne(id: number, numerosolicitud: string) {
    console.log("id",id);
    console.log("numerosolicitud",numerosolicitud);
    return this.webSolicitudgrandeRepository.findOne({ where: {  NumeroSolicitud:numerosolicitud } });
  }

  update(id: number, updateWebSolicitudgrandeDto: UpdateWebSolicitudgrandeDto) {
    return this.webSolicitudgrandeRepository.update(id, updateWebSolicitudgrandeDto);
  }
  remove(id: number) {
    return `This action removes a #${id} webSolicitudgrande`;
  }
}
