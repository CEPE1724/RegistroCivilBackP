import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateIngresoCobradorDto } from './dto/create-ingreso-cobrador.dto';
import { UpdateIngresoCobradorDto } from './dto/update-ingreso-cobrador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { IngresoCobrador } from './entities/ingreso-cobrador.entity';

@Injectable()
export class IngresoCobradorService {

	private readonly logger = new Logger('IngresoCobradorService')

	constructor(
		@InjectRepository(IngresoCobrador)
		private readonly ingresoCobradorRepository: Repository<IngresoCobrador>,
	) { }

	async findAll() {
		try {
			return await this.ingresoCobradorRepository.find({
				where: {
					idIngresoCobrador: Not(271),
					idCom_Estado: Not(2)
				},
				relations: ['dispositivos'],
				select: {
					idIngresoCobrador: true,
					Nombre: true,
					dispositivos: {
						TokenExpo: true
					}
				}
			});
		} catch (error) {
			this.handleDBException(error);
		}
	}

	private handleDBException(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException(error.detail);
		}
		this.logger.error(error);
		throw new InternalServerErrorException('Unexpected error');

	}
}
