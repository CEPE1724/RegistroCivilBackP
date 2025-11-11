import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UatEqfxResultado } from './entities/uat_eqfx_resultado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxResultadoService {

	constructor(
		@InjectRepository(UatEqfxResultado)
		private readonly UatEqfxResultadoRepository: Repository<UatEqfxResultado>
	) { }

	findAll() {
		return `This action returns all uatEqfxResultado`;
	}

	async findOne(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxResultadoRepository.findOne({
			where: {
				idEQFX_IdentificacionConsultada,
				variable: 'CAPACIDAD DE PAGO :',
			}
		});
		if (!result) {
			return {
				success: false,
				message: `No se encontró ningún documento con el id: ${idEQFX_IdentificacionConsultada}`,
			};
		}
		return {
			success: true,
			data: result,
		};
	}

}
