import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UatEqfxDetalleDeudaActualSep } from './entities/uat_eqfx_detalle_deuda_actual_sep.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UatEqfxDetalleDeudaActualSepsService {

	constructor(
		@InjectRepository(UatEqfxDetalleDeudaActualSep)
		private readonly UatEqfxDetalleDeudaActualSepRepository: Repository<UatEqfxDetalleDeudaActualSep>
	) { }


	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxDetalleDeudaActualSepRepository.find({ where: { idEQFX_IdentificacionConsultada } });
		if (!result) {
			return {
				success: false,
				message: `No se encontró ningún documento`,
			};
		}

		const dataWithSegmento = result.map((item) => ({
			...item,
			segmento: 'SEPS',
		}));

		return {
			success: true,
			data: dataWithSegmento,
		};
	}
}
