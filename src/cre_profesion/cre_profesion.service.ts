import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCreProfesionDto } from './dto/create-cre_profesion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreProfesion } from './entities/cre_profesion.entity';

@Injectable()
export class CreProfesionService {

	private readonly logger = new Logger('CreProfesionService');

	constructor(
		@InjectRepository(CreProfesion)
		private readonly creNiveleducacionRepository: Repository<CreProfesion>,
	) { }

	findAll() {
		return this.creNiveleducacionRepository.find();
	}

	private handleDBExceptions(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException(error.detail);
		}

		this.logger.error(error);
		throw new InternalServerErrorException('Error al guardar los datos');
	}

}
