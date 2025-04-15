import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreTiempovivienda } from './entities/cre_tiempovivienda.entity';

@Injectable()
export class CreTiempoviviendaService {
  
	private readonly logger = new Logger('CreTiempoviviendaService');

  findAll() {
    return this.creTiempoviviendaRepository.find();
  }

  constructor(
	@InjectRepository(CreTiempovivienda)
	private readonly creTiempoviviendaRepository: Repository<CreTiempovivienda>,) { }


	private handleDBExceptions(error: any) {
		if (error.code === '23505') {
		  throw new BadRequestException(error.detail);
		}
	
		this.logger.error(error);
		throw new InternalServerErrorException('Error al guardar los datos');
	  }
}
