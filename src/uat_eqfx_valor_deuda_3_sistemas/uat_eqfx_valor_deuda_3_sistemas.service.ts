import { Injectable } from '@nestjs/common';
import { CreateUatEqfxValorDeuda3SistemaDto } from './dto/create-uat_eqfx_valor_deuda_3_sistema.dto';
import { UpdateUatEqfxValorDeuda3SistemaDto } from './dto/update-uat_eqfx_valor_deuda_3_sistema.dto';
import { UatEqfxValorDeuda3Sistema } from './entities/uat_eqfx_valor_deuda_3_sistema.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxValorDeuda3SistemasService {

	constructor(
		@InjectRepository(UatEqfxValorDeuda3Sistema) private readonly UatEqfxValorDeuda3SistemaRepository: Repository<UatEqfxValorDeuda3Sistema>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxValorDeuda3SistemaRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
