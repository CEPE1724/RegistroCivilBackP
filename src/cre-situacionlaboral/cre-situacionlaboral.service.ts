import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCreSituacionlaboralDto } from './dto/create-cre-situacionlaboral.dto';
import { UpdateCreSituacionlaboralDto } from './dto/update-cre-situacionlaboral.dto';
import { CreSituacionlaboral } from './entities/cre-situacionlaboral.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class CreSituacionlaboralService {
   private readonly logger = new Logger('CreSituacionlaboralService');
  
   constructor(
      @InjectRepository(CreSituacionlaboral)
      private readonly creSituacionlaboralRepository: Repository<CreSituacionlaboral>,
    ) { }

  findAll() {
    return this.creSituacionlaboralRepository.find({
      where: {
        idEntidadFinanciera: 4,
        
      },
    });
  }

  private handleDBException(error: any) {
     if (error.code === '23505') {
       throw new BadRequestException(error.detail);
     }
     this.logger.error(error);
     throw new InternalServerErrorException('Unexpected error');
 
   }
}
