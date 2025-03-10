import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreCiudadinmueble } from './entities/cre_ciudadinmueble.entity';

@Injectable()
export class CreCiudadinmuebleService {

	private readonly logger = new Logger('CreCiudadinmuebleService');

	constructor(
			@InjectRepository(CreCiudadinmueble)
			private readonly creCiudadinmuebleRepository: Repository<CreCiudadinmueble>,
	) { }
	

  findAll() {
    return this.creCiudadinmuebleRepository.find();
  }

  private handleDBExceptions(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException(error.detail);
		}
  
		this.logger.error(error);
		throw new InternalServerErrorException('Error al guardar los datos');
	}

}
