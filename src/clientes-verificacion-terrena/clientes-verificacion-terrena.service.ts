import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateClientesVerificacionTerrenaDto } from './dto/create-clientes-verificacion-terrena.dto';
import { UpdateClientesVerificacionTerrenaDto } from './dto/update-clientes-verificacion-terrena.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientesVerificacionTerrena } from './entities/clientes-verificacion-terrena.entity';
import { TerrenaGestionDomicilio } from '../terrena-gestion-domicilio/entities/terrena-gestion-domicilio.entity';

@Injectable()
export class ClientesVerificacionTerrenaService {

	private readonly logger = new Logger('ClientesVerificacionTerrenaService');

	constructor(
		@InjectRepository(ClientesVerificacionTerrena)
		private readonly clientesVerificacionTerrenaRepository: Repository<ClientesVerificacionTerrena>,
	) { }

	create(createClientesVerificacionTerrenaDto: CreateClientesVerificacionTerrenaDto) {
		return 'This action adds a new clientesVerificacionTerrena';
	}

	async createVerificacionBasica(data: {
		idCre_solicitud?: number;
		idVerificador?: number;
		bDomicilio?: boolean;
		bTrabajo?: boolean;
		Usuario?: string;
		Web?: number;
	}): Promise<ClientesVerificacionTerrena> {
		try {
			let whereCondition: any = {
				idCre_solicitud: data.idCre_solicitud,
			};

			if (data.bDomicilio) {
				whereCondition.bDomicilio = true;
			}

			if (data.bTrabajo) {
				whereCondition.bTrabajo = true;
			}

			const count = await this.clientesVerificacionTerrenaRepository.count({
				where: whereCondition,
			});

			if (count >= 3) {
				throw new BadRequestException(
					`Ya existen 3 verificaciones de este tipo para la solicitud con ID ${data.idCre_solicitud}.`
				);
			}
			const nuevaVerificacion = this.clientesVerificacionTerrenaRepository.create({
				idCre_solicitud: data.idCre_solicitud,
				idVerificador: data.idVerificador,
				bDomicilio: data.bDomicilio,
				bTrabajo: data.bTrabajo,
				Usuario: data.Usuario,
				Web: data.Web,
			});

			return await this.clientesVerificacionTerrenaRepository.save(nuevaVerificacion);
		} catch (error) {
			this.handleDBException(error);
		}
	}


	findAll(idCre_Solicitud: number, tipo?: 'domicilio' | 'trabajo') {
		let whereCondition: any = {
			idCre_solicitud: idCre_Solicitud,
		};

		if (tipo === 'domicilio') {
			whereCondition.bDomicilio = true;
		}

		if (tipo === 'trabajo') {
			whereCondition.bTrabajo = true;
		}

		return this.clientesVerificacionTerrenaRepository.find({
			where: whereCondition,
		});
	}

	async findOne(idCreSolicitud: number, Tipo: number) {

		if (Tipo == 1) {
			return await this.clientesVerificacionTerrenaRepository.findOne({
				where: {
					idCre_solicitud: idCreSolicitud, Web: 1,
					bDomicilio: true,
					//iEstado: 0
				},
				select: ['idTerrenaGestionDomicilio', 'idTerrenaGestionTrabajo'],
			});
		} else {
			return await this.clientesVerificacionTerrenaRepository.findOne({
				where: {
					idCre_solicitud: idCreSolicitud, Web: 1,
					bTrabajo: true,
					//iEstado: 0
				},
				select: ['idTerrenaGestionDomicilio', 'idTerrenaGestionTrabajo'],
			});

		}
	}
	update(id: number, updateClientesVerificacionTerrenaDto: UpdateClientesVerificacionTerrenaDto) {
		return this.clientesVerificacionTerrenaRepository.update(
			{ idClienteVerificacion: id },
			updateClientesVerificacionTerrenaDto
		);
	}

	remove(id: number) {
		return `This action removes a #${id} clientesVerificacionTerrena`;
	}

	private handleDBException(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException(error.detail);
		}
		this.logger.error(error);
		throw new InternalServerErrorException('Unexpected error');

	}
}
