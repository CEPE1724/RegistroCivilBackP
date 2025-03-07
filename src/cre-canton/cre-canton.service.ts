import { Injectable } from '@nestjs/common';
import { CreateCreCantonDto } from './dto/create-cre-canton.dto';
import { UpdateCreCantonDto } from './dto/update-cre-canton.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CreCanton } from './entities/cre-canton.entity';

@Injectable()
export class CreCantonService {

 private readonly logger = new Logger('CreCantonService');

constructor(
  @InjectRepository(CreCanton)
  private readonly creCantonRepository: Repository<CreCanton>,
) { }

async findByProvincia(idProvincia: number) {
  return await this.creCantonRepository.find({
    where: { idProvincia }, // Filtramos los cantones que pertenezcan a esa provincia
  });
}
}
