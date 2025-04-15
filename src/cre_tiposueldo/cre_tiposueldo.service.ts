import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreTiposueldo } from './entities/cre_tiposueldo.entity';

@Injectable()
export class CreTiposueldoService {

	private readonly logger = new Logger('CreTiposueldoService');

	constructor(
		@InjectRepository(CreTiposueldo)
		private readonly creTiposueldoRepository: Repository<CreTiposueldo>,
	) { }

	findAll() {
		return this.creTiposueldoRepository.find();
	}

	private handleDBExceptions(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException(error.detail);
		}

		this.logger.error(error);
		throw new InternalServerErrorException('Error al guardar los datos');
	}

}
