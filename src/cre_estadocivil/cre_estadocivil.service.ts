import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/* importamos la entidad*/
import { CreEstadocivil } from './entities/cre_estadocivil.entity';

@Injectable()
export class CreEstadocivilService {
 
  /* control de errores y ubicaicondel archivo*/
  private readonly logger = new Logger('CreEstadocivilService');


  constructor(
     @InjectRepository(CreEstadocivil)
     private readonly creEstadocivilRepository: Repository<CreEstadocivil>,
     
   )
    { }
  

  findAll() {
    return  this.creEstadocivilRepository.find();
  }
/*en toda slos ervices por default se pega*/
  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }


}
