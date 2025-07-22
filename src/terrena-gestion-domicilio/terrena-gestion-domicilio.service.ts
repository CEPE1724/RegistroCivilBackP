import { Injectable } from '@nestjs/common';
import { CreateTerrenaGestionDomicilioDto } from './dto/create-terrena-gestion-domicilio.dto';
import { UpdateTerrenaGestionDomicilioDto } from './dto/update-terrena-gestion-domicilio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TerrenaGestionDomicilio } from './entities/terrena-gestion-domicilio.entity';
import { Logger } from '@nestjs/common';


@Injectable()
export class TerrenaGestionDomicilioService {
  private readonly logger = new Logger('TerrenaGestionDomicilioService');
  constructor(
    @InjectRepository(TerrenaGestionDomicilio)
    private readonly terrenaRepo: Repository<TerrenaGestionDomicilio>,
  ) {}

  async findOne(id: number) {
    return await this.terrenaRepo.findOne({ where: { idTerrenaGestionDomicilio: id } });
  }

  async updateTipoVerificacion(id: number, tipoVerificacion: number) {
    await this.terrenaRepo.update({ idTerrenaGestionDomicilio: id }, { tipoVerificacion });
    return this.findOne(id);
  }

}