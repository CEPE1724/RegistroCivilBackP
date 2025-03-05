import { Injectable } from '@nestjs/common';
import { CreateCreProvinciaDto } from './dto/create-cre_provincia.dto';
import { UpdateCreProvinciaDto } from './dto/update-cre_provincia.dto';
import {CreProvincia} from './entities/cre_provincia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

@Injectable()
export class CreProvinciaService {


 private readonly logger = new Logger('CompraencuestaService');

  constructor(
    @InjectRepository(CreProvincia)
    private readonly creprovinicarepository: Repository<CreProvincia>,
  ) { }
  create(createCreProvinciaDto: CreateCreProvinciaDto) {
    return 'This action adds a new creProvincia';
  }

  findAll() {
    return this.creprovinicarepository.find();
  }
  

  findOne(id: number) {
    return `This action returns a #${id} creProvincia`;
  }

  update(id: number, updateCreProvinciaDto: UpdateCreProvinciaDto) {
    return `This action updates a #${id} creProvincia`;
  }

  remove(id: number) {
    return `This action removes a #${id} creProvincia`;
  }
}
