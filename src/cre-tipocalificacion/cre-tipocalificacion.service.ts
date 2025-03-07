import { Injectable } from '@nestjs/common';
import { CreateCreTipocalificacionDto } from './dto/create-cre-tipocalificacion.dto';
import { UpdateCreTipocalificacionDto } from './dto/update-cre-tipocalificacion.dto';
import {CreTipocalificacion} from './entities/cre-tipocalificacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
@Injectable()
export class CreTipocalificacionService {

   private readonly logger = new Logger('CreTipocalificacionService');
   constructor(
     @InjectRepository(CreTipocalificacion)
     private readonly cretipocalificacionrepository: Repository<CreTipocalificacion>,
   ) { }

  findAll() {
    return this.cretipocalificacionrepository.find();}

 
}
