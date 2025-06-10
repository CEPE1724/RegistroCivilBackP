import { Injectable, Logger } from '@nestjs/common';
import { CreateDispositivosAppDto } from './dto/create-dispositivos-app.dto';
import { UpdateDispositivosAppDto } from './dto/update-dispositivos-app.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { DispositivosApp } from './entities/dispositivos-app.entity';
import { IngresoCobrador } from 'src/ingreso-cobrador/entities/ingreso-cobrador.entity';
import { Nomina } from 'src/nomina/entities/nomina.entity';

@Injectable()
export class DispositivosAppService {
	private readonly logger = new Logger('DispositivosAppService');
	constructor(
		@InjectRepository(DispositivosApp)
		private readonly dispositivosAppRepository: Repository<DispositivosApp>,
		@InjectRepository(IngresoCobrador)
		private readonly ingresoCobradorRepository: Repository<IngresoCobrador>,
		@InjectRepository(Nomina)
		private readonly nominaRepository: Repository<Nomina>,
	) { }

	async findAll(Empresa: number) {

		let dispositivos;

		if (Empresa === 1) {
			// Consulta específica para empresa 1
			dispositivos = await this.dispositivosAppRepository
				.createQueryBuilder('dispositivo')
				.where('dispositivo.Empresa = :empresaId', { empresaId: Empresa })
				.andWhere('dispositivo.TokenExpo IS NOT NULL')
				.andWhere('dispositivo.TokenExpo != :empty', { empty: '' })
				.leftJoin(
					'Nomina',
					'nomina',
					'dispositivo.idNomina = nomina.idNomina'
				)
				.addSelect(['nomina.PrimerNombre', 'nomina.ApellidoPaterno'])
				.getMany();

			dispositivos = await Promise.all(dispositivos.map(async (disp) => {
				const nominaInfo = await this.nominaRepository.findOne({
					where: { idNomina: disp.idNomina },
					select: ['PrimerNombre', 'ApellidoPaterno']
				});

				return {
					...disp,
					nombreCompleto: nominaInfo ?
						`${nominaInfo.PrimerNombre || ''} ${nominaInfo.ApellidoPaterno || ''}` : ''
				};
			}));

		} else if (Empresa === 33) {
			// Consulta específica para empresa 33
			dispositivos = await this.dispositivosAppRepository
				.createQueryBuilder('dispositivo')
				.where('dispositivo.Empresa = :empresaId', { empresaId: Empresa })
				.andWhere('dispositivo.TokenExpo IS NOT NULL')
				.andWhere('dispositivo.TokenExpo != :empty', { empty: '' })
				.leftJoin(
					'IngresoCobrador',
					'ingresoCobrador',
					'dispositivo.idNomina = ingresoCobrador.idIngresoCobrador'
				)
				.addSelect(['ingresoCobrador.Nombre'])
				.getMany();

			dispositivos = await Promise.all(dispositivos.map(async (disp) => {
				const cobradorInfo = await this.ingresoCobradorRepository.findOne({
					where: { idIngresoCobrador: disp.idNomina },
					select: ['Nombre']
				});

				return {
					...disp,
					nombreCompleto: cobradorInfo ? cobradorInfo.Nombre : ''
				};
			}));

		} else {
			// Para otras empresas
			dispositivos = await this.dispositivosAppRepository
				.createQueryBuilder('dispositivo')
				.where('dispositivo.Empresa = :empresaId', { empresaId: Empresa })
				.andWhere('dispositivo.TokenExpo IS NOT NULL')
				.andWhere('dispositivo.TokenExpo != :empty', { empty: '' })
				.getMany();
		}

		if (!dispositivos.length) {
			return { success: false, message: 'No se encontró ningún documento' };
		}

		return { success: true, data: dispositivos };
	}



	create(createDispositivosAppDto: CreateDispositivosAppDto) {
		return 'This action adds a new dispositivosApp';
	}

	findOne(id: number) {
		return `This action returns a #${id} dispositivosApp`;
	}

	findOnebyUsuario(usuario: string) {
		return this.dispositivosAppRepository.findOne({
			where: {
				UsuarioAPP: usuario,
			},
			select: ['idDispositivosAPP', 'TokenExpo', 'UsuarioAPP'],
		});
	}

	update(id: number, updateDispositivosAppDto: UpdateDispositivosAppDto) {
		return `This action updates a #${id} dispositivosApp`;
	}

	remove(id: number) {
		return `This action removes a #${id} dispositivosApp`;
	}
}
