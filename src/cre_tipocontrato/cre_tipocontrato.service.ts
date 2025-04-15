import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreTipocontrato } from './entities/cre_tipocontrato.entity';

@Injectable()
export class CreTipocontratoService {

	private readonly logger = new Logger('CreTipocontratoService');

	constructor(
		@InjectRepository(CreTipocontrato)
		private readonly creTipocontratoRepository: Repository<CreTipocontrato>,
	) { }

	findAll() {
		return this.creTipocontratoRepository.find();
	}

	private handleDBExceptions(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException(error.detail);
		}

		this.logger.error(error);
		throw new InternalServerErrorException('Error al guardar los datos');
	}

}
