import { Injectable, Logger } from '@nestjs/common';
import { CreateUatEqfxResultSegmentacionDto } from './dto/create-uat_eqfx_result_segmentacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UatEqfxResultSegmentacion } from './entities/uat_eqfx_result_segmentacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxResultSegmentacionService {
	private readonly logger = new Logger('UatEqfxResultSegmentacionService');
	constructor(
		@InjectRepository(UatEqfxResultSegmentacion)
		private readonly UatEqfxResultSegmentacionRepository: Repository<UatEqfxResultSegmentacion>
	) { }


	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxResultSegmentacionRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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

	async findOne(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxResultSegmentacionRepository.findOne({ where: { idEQFX_IdentificacionConsultada } });
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
