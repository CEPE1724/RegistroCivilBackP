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

			@InjectRepository(TerrenaGestionDomicilio)
			private readonly terrenaGestionDomicilioRepository: Repository<TerrenaGestionDomicilio>,
	) {}

  create(createClientesVerificacionTerrenaDto: CreateClientesVerificacionTerrenaDto) {
    return 'This action adds a new clientesVerificacionTerrena';
  }

  async createVerificacionBasica(data: {
	idCre_solicitud?: number;
	idVerificador?: number;
	bDomicilio?: boolean;
	bTrabajo?: boolean;
	Usuario?: string;
  }): Promise<ClientesVerificacionTerrena> {
	try {
	  const nuevaVerificacion = this.clientesVerificacionTerrenaRepository.create({
		idCre_solicitud: data.idCre_solicitud,
		idVerificador: data.idVerificador,
		bDomicilio: data.bDomicilio,
		bTrabajo: data.bTrabajo,
		Usuario: data.Usuario,
	  });
  
	  return await this.clientesVerificacionTerrenaRepository.save(nuevaVerificacion);
	} catch (error) {
	  this.handleDBException(error);
	}
  }
  

  findAll() {
    return `This action returns all clientesVerificacionTerrena`;
  }

  async findOne(idCreSolicitud: number) {
    return await this.clientesVerificacionTerrenaRepository.findOne({
      where: { idCre_solicitud: idCreSolicitud, Web: 1 }, 
      select: ['idTerrenaGestionDomicilio', 'idTerrenaGestionTrabajo'],
    });
  }

  async getGestionDomicilioPorSolicitud(idCreSolicitud: number): Promise<TerrenaGestionDomicilio> {
	try {
	  const cliente = await this.clientesVerificacionTerrenaRepository.findOne({
		where: { idCre_solicitud: idCreSolicitud, Web: 1 },
		select: ['idTerrenaGestionDomicilio'],
	  });
  
	  if (!cliente || !cliente.idTerrenaGestionDomicilio) {
		throw new BadRequestException('No se encontró verificación de domicilio registrada para esta solicitud.');
	  }
  
	  const gestionDomicilio = await this.terrenaGestionDomicilioRepository.findOne({
		where: { idTerrenaGestionDomicilio: cliente.idTerrenaGestionDomicilio },
	  });
  
	  if (!gestionDomicilio) {
		throw new BadRequestException('No se encontró información en TerrenaGestionDomicilio.');
	  }
  
	  return gestionDomicilio;
	} catch (error) {
	  this.handleDBException(error);
	}
  }
  
  
  update(id: number, updateClientesVerificacionTerrenaDto: UpdateClientesVerificacionTerrenaDto) {
    return `This action updates a #${id} clientesVerificacionTerrena`;
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
