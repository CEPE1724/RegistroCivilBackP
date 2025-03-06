import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCreTipoempresaDto } from './dto/create-cre_tipoempresa.dto';
import { UpdateCreTipoempresaDto } from './dto/update-cre_tipoempresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreTipoempresa } from './entities/cre_tipoempresa.entity';

@Injectable()
export class CreTipoempresaService {

	private readonly logger = new Logger('CreTipoempresaService');

	constructor(
			@InjectRepository(CreTipoempresa)
			private readonly creTipoempresaRepository: Repository<CreTipoempresa>,
	) { }

	findAll() {
		return this.creTipoempresaRepository.find();
	}

	private handleDBExceptions(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException(error.detail);
		}

		this.logger.error(error);
		throw new InternalServerErrorException('Error al guardar los datos');
	}

}
