import { Injectable } from '@nestjs/common';
import { CreateCreBarrioDto } from './dto/create-cre_barrio.dto';
import { UpdateCreBarrioDto } from './dto/update-cre_barrio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CreBarrio } from './entities/cre_barrio.entity';
@Injectable()
export class CreBarrioService {
  private readonly logger = new Logger('CreBarrioService');
  constructor(
    @InjectRepository(CreBarrio)
    private readonly creBarrioRepository: Repository<CreBarrio>,
  ) { }
  async findByParroquia(idParroquia: number) {
    return await this.creBarrioRepository.find({
      where: { idParroquia }, // Filtramos los barrios que pertenezcan a esa parroquia
    });
  }
}
