import { Injectable } from '@nestjs/common';
import { CreateCreVerificacionTelefonicaMaestroDto } from './dto/create-cre_verificacion-telefonica-maestro.dto';
import { UpdateCreVerificacionTelefonicaMaestroDto } from './dto/update-cre_verificacion-telefonica-maestro.dto';
import { CreVerificacionTelefonicaMaestro } from './entities/cre_verificacion-telefonica-maestro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
@Injectable()
export class CreVerificacionTelefonicaMaestroService {
private readonly logger = new Logger('CreVerificacionTelefonicaMaestroService');
constructor(
  @InjectRepository(CreVerificacionTelefonicaMaestro)
  private readonly creVerificacionTelefonicaMaestroRepository: Repository<CreVerificacionTelefonicaMaestro>,
) { }
async findByID(idCre_SolicitudWeb: number) {
  return await this.creVerificacionTelefonicaMaestroRepository.find({
    where: { idCre_SolicitudWeb }, // Ensure this matches the entity property
  }); 

}

async create(createCreVerificacionTelefonicaMaestroDto: CreateCreVerificacionTelefonicaMaestroDto) {
  try {
    const newRecord = this.creVerificacionTelefonicaMaestroRepository.create(createCreVerificacionTelefonicaMaestroDto);
    return await this.creVerificacionTelefonicaMaestroRepository.save(newRecord);
  } catch (error) {
    this.logger.error('Error creating record', error);
    throw error;
  }

}
async update(idCre_VerificacionTelefonicaMaestro: number, updateCreVerificacionTelefonicaMaestroDto: UpdateCreVerificacionTelefonicaMaestroDto) {
  try {
    await this.creVerificacionTelefonicaMaestroRepository.update(idCre_VerificacionTelefonicaMaestro, updateCreVerificacionTelefonicaMaestroDto);
    return await this.creVerificacionTelefonicaMaestroRepository.findOneBy({ idCre_VerificacionTelefonicaMaestro });
  } catch (error) {
    this.logger.error('Error updating record', error);
    throw error;
  }
}
}

