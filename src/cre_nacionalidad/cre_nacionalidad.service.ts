import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreNacionalidad } from './entities/cre_nacionalidad.entity';

@Injectable()
export class CreNacionalidadService {
  
	private readonly logger = new Logger('CreNacionalidadService');

	constructor(
		@InjectRepository(CreNacionalidad)
		private readonly creNacionalidadRepository: Repository<CreNacionalidad>,
	) { }

  findAll() {
    return this.creNacionalidadRepository.find();
  }

  private handleDBExceptions(error: any) {
	if (error.code === '23505') {
		throw new BadRequestException(error.detail);
	}

	this.logger.error(error);
	throw new InternalServerErrorException('Error al guardar los datos');
}

}
