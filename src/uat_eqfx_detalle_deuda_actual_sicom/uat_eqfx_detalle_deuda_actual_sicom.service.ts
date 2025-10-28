import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UatEqfxDetalleDeudaActualSicom } from './entities/uat_eqfx_detalle_deuda_actual_sicom.entity';

@Injectable()
export class UatEqfxDetalleDeudaActualSicomService {

	constructor(
		@InjectRepository(UatEqfxDetalleDeudaActualSicom)
		private readonly UatEqfxDetalleDeudaActualSicomRepository: Repository<UatEqfxDetalleDeudaActualSicom>
	) { }


	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxDetalleDeudaActualSicomRepository.find({ where: { idEQFX_IdentificacionConsultada } });
		if (!result) {
			return {
				success: false,
				message: `No se encontró ningún documento`,
			};
		}

		const dataWithSegmento = result.map((item) => ({
			...item,
			segmento: 'SICOM',
		}));

		return {
			success: true,
			data: dataWithSegmento,
		};
	}
}