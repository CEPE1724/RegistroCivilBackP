import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreCargo } from './entities/cre_cargo.entity';

@Injectable()
export class CreCargoService {

	private readonly logger = new Logger('CreCargoService');

	constructor(
		@InjectRepository(CreCargo)
		private readonly creCargoRepository: Repository<CreCargo>,
	) { }

	findAll() {
		return this.creCargoRepository.find();
	}

	private handleDBExceptions(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException(error.detail);
		}

		this.logger.error(error);
		throw new InternalServerErrorException('Error al guardar los datos');
	}

}
