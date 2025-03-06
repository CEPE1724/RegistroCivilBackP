import { Injectable } from '@nestjs/common';
import { CreateCreParroquiaDto } from './dto/create-cre_parroquia.dto';
import { UpdateCreParroquiaDto } from './dto/update-cre_parroquia.dto';
import { CreParroquia } from './entities/cre_parroquia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
@Injectable()
export class CreParroquiaService {
private readonly logger = new Logger('CreParroquiaService');
constructor(
  @InjectRepository(CreParroquia)
  private readonly creParroquiaRepository: Repository<CreParroquia>,
) { }
async findByCanton(idCanton: number) {
  return await this.creParroquiaRepository.find({
    where: { idCanton }, // Filtramos las parroquias que pertenezcan a ese cantón
  });
}
}
