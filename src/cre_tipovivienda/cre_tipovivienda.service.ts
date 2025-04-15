import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreTipovivienda } from './entities/cre_tipovivienda.entity';

@Injectable()
export class CreTipoviviendaService {
  
	  private readonly logger = new Logger('CreTipoviviendaService');

  findAll() {
    return this.creTipoviviendaRepository.find();
  }

  constructor(
	@InjectRepository(CreTipovivienda)
	private readonly creTipoviviendaRepository: Repository<CreTipovivienda>,
	  ) { }

  private handleDBExceptions(error: any) {
	  if (error.code === '23505') {
		throw new BadRequestException(error.detail);
	  }
  
	  this.logger.error(error);
	  throw new InternalServerErrorException('Error al guardar los datos');
	}

}
