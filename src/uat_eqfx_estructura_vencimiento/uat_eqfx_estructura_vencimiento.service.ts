import { Injectable } from '@nestjs/common';
import { UatEqfxEstructuraVencimiento } from './entities/uat_eqfx_estructura_vencimiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxEstructuraVencimientoService {

	constructor(
		@InjectRepository(UatEqfxEstructuraVencimiento)
		private readonly UatEqfxEstructuraVencimientoRepository: Repository<UatEqfxEstructuraVencimiento>,
	) {}

  async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxEstructuraVencimientoRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
