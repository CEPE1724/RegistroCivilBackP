import { Injectable } from '@nestjs/common';
import { CreateInfoSistemaDto } from './dto/create-info-sistema.dto';
import { UpdateInfoSistemaDto } from './dto/update-info-sistema.dto';
import { InfoSistema } from './entities/info-sistema.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InfoSistemaService {
  constructor(
    @InjectRepository(InfoSistema)
    private readonly infoSistemaRepository: Repository<InfoSistema>,
  ) {}

  async existeIngreso(usuario: string): Promise<boolean> {
    const existe = await this.infoSistemaRepository.findOne({ where: { Usuario: usuario } });
    return !!existe;
  }

  async registrarIngreso(data: Partial<InfoSistema>) {
    const nuevo = this.infoSistemaRepository.create({
      ...data,
      Fecha: new Date(),
      FechaSistema: new Date(),
    });
    return await this.infoSistemaRepository.save(nuevo);
  }
}

