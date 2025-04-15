import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository } from 'typeorm';
import { CreateCreverificaciontelefonicaDto } from './dto/create-creverificaciontelefonica.dto';
import { UpdateCreverificaciontelefonicaDto } from './dto/update-creverificaciontelefonica.dto';
import { Creverificaciontelefonica } from './entities/creverificaciontelefonica.entity';

@Injectable()
export class CreverificaciontelefonicaService {
   private readonly logger = new Logger('CreSolicitudWebService');
  
   constructor(
    @InjectRepository(Creverificaciontelefonica)
    private readonly creverificaciontelefonicaRepository: Repository<Creverificaciontelefonica>,
   ) { }


  async create(createCreverificaciontelefonicaDto: CreateCreverificaciontelefonicaDto) {
    return  this.creverificaciontelefonicaRepository.save(createCreverificaciontelefonicaDto).catch((error) => {
      this.handleDBException(error);
    }
    );
  }

  findOne(id: number) {
    return this.creverificaciontelefonicaRepository.findOne({ where: { idCre_VerificacionTelefonica: id } });
  }




   private handleDBException(error: any) {
      if (error.code === '23505') {
        throw new BadRequestException(error.detail);
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpected error');
  
    }
}
