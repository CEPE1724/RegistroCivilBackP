import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreInmueble } from './entities/cre_inmueble.entity';

@Injectable()
export class CreInmuebleService {

	private readonly logger = new Logger('CreInmuebleService');

	constructor(
		@InjectRepository(CreInmueble)
		private readonly creInmuebleRepository: Repository<CreInmueble>,
	) { }

	findAll() {
		return this.creInmuebleRepository.find();
	}
	private handleDBExceptions(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException(error.detail);
		}

		this.logger.error(error);
		throw new InternalServerErrorException('Error al guardar los datos');
	}


}
