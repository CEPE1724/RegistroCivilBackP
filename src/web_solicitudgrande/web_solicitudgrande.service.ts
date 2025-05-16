import {
  BadRequestException, Injectable,
  InternalServerErrorException,
  Logger, NotFoundException
} from '@nestjs/common';

import { CreateWebSolicitudgrandeDto } from './dto/create-web_solicitudgrande.dto';
import { UpdateWebSolicitudgrandeDto } from './dto/update-web_solicitudgrande.dto';
import { UpdateCuotaYCupoDto } from './dto/update-web_solicitudgrande.dto';
import { WebSolicitudgrande } from './entities/web_solicitudgrande.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class WebSolicitudgrandeService {
  private readonly logger = new Logger('AuthServiceCogno');

  constructor(
    @InjectRepository(WebSolicitudgrande)
    private webSolicitudgrandeRepository: Repository<WebSolicitudgrande>,
  ) {}

  create(createWebSolicitudgrandeDto: CreateWebSolicitudgrandeDto) {
    try {
		const dtoTransformado: any = {
			...createWebSolicitudgrandeDto,
			ValorInmmueble: createWebSolicitudgrandeDto.ValorInmmueble
			  ? parseFloat(createWebSolicitudgrandeDto.ValorInmmueble)
			  : undefined,
		  };
      const newSolicitud = this.webSolicitudgrandeRepository.create(dtoTransformado);
      return this.webSolicitudgrandeRepository.save(newSolicitud);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException('Error en el servidor');
    }
  }
   
  findAll() {
    return `This action returns all webSolicitudgrande`;
  }

  findOne(id: number, numerosolicitud: string) {

    return this.webSolicitudgrandeRepository.findOne({ where: {  NumeroSolicitud:numerosolicitud } });
  }

  update(id: string, updateWebSolicitudgrandeDto: UpdateWebSolicitudgrandeDto) {
	const dtoTransformado: any = {
		...updateWebSolicitudgrandeDto,
		ValorInmmueble: updateWebSolicitudgrandeDto.ValorInmmueble
		  ? parseFloat(updateWebSolicitudgrandeDto.ValorInmmueble)
		  : undefined,
	  };
    return this.webSolicitudgrandeRepository.update(
      { idWeb_SolicitudGrande: id },
      { ...dtoTransformado },
    );


  }

 //update al campo CuotaAsignada y Cupo
async updateCuotayCupo(id: string, updateDto: UpdateCuotaYCupoDto) {
  try {
    // Verificar si la solicitud existe
    const exists = await this.webSolicitudgrandeRepository.existsBy({ 
      idWeb_SolicitudGrande: id 
    });
    
    if (!exists) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }
    // Actualizar solo los campos proporcionados
    const updateData: Partial<WebSolicitudgrande> = {};
    
    if (updateDto.CuotaAsignada !== undefined) {
      updateData.CuotaAsignada = updateDto.CuotaAsignada;
    }
    
    if (updateDto.Cupo !== undefined) {
      updateData.Cupo = updateDto.Cupo;
    }

    // Ejecutar la actualización
    const result = await this.webSolicitudgrandeRepository.update(
      { idWeb_SolicitudGrande: id },
      updateData
    );

    if (result.affected === 0) {
      throw new NotFoundException(`No se pudo actualizar la solicitud con ID ${id}`);
    }

    return { success: true, message: 'Actualización exitosa' };
  } catch (error) {
    this.logger.error(error.message, error.stack);
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Error actualizando cuota y cupo');
  }
  }

  remove(id: number) {
    return `This action removes a #${id} webSolicitudgrande`;
  }
}
