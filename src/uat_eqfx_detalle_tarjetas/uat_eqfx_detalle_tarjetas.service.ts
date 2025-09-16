import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UatEqfxDetalleTarjeta } from './entities/uat_eqfx_detalle_tarjeta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxDetalleTarjetasService {

	constructor(
		@InjectRepository(UatEqfxDetalleTarjeta)
		private readonly UatEqfxDetalleTarjetaRepository: Repository<UatEqfxDetalleTarjeta>,
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxDetalleTarjetaRepository.find({ where: { idEQFX_IdentificacionConsultada } });
		if (!result) {
			return {
				success: false,
				message: `No se encontró ningún documento`,
			};
		}
		return {
			success: true,
			data: result,
		};
	}
}
