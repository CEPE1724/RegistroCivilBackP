import { Injectable } from '@nestjs/common';
import { UatEqfxDetalleEstructuraVencimiento } from './entities/uat_eqfx_detalle_estructura_vencimiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UatEqfxDetalleEstructuraVencimientoService {

	constructor(
		@InjectRepository(UatEqfxDetalleEstructuraVencimiento)
		private readonly UatEqfxDetalleEstructuraVencimientoRepository: Repository<UatEqfxDetalleEstructuraVencimiento>
	) { }


	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxDetalleEstructuraVencimientoRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
