import { Injectable, Logger } from '@nestjs/common';
import { CreateGeoreferenciaEntregaDomicilioDto } from './dto/create-georeferencia-entrega-domicilio.dto';
import { UpdateGeoreferenciaEntregaDomicilioDto } from './dto/update-georeferencia-entrega-domicilio.dto';
import { GeoreferenciaEntregaDomicilio } from './entities/georeferencia-entrega-domicilio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GeoreferenciaEntregaDomicilioService {

  private readonly logger = new Logger('GeoreferenciaEntregaDomicilioService');
  constructor(
    @InjectRepository(GeoreferenciaEntregaDomicilio)
    private readonly georeferenciaEntregaDomicilioRepository: Repository<GeoreferenciaEntregaDomicilio>,
  ) { }


  async create(createGeoreferenciaEntregaDomicilioDto: CreateGeoreferenciaEntregaDomicilioDto) {

    try {

      // consultar con bodega y cedula y codigoEntrega si ya existe un registro actualiza el registro
      const existingRecord = await this.georeferenciaEntregaDomicilioRepository.findOne({
        where: {
          Bodega: createGeoreferenciaEntregaDomicilioDto.Bodega,
          cedula: createGeoreferenciaEntregaDomicilioDto.cedula,
          codigoEntrega: createGeoreferenciaEntregaDomicilioDto.codigoEntrega,
        },
      });
      if (existingRecord ) {
        this.logger.log(`Updating existing record for Bodega: ${createGeoreferenciaEntregaDomicilioDto.Bodega}, cedula: ${createGeoreferenciaEntregaDomicilioDto.cedula}, codigoEntrega: ${createGeoreferenciaEntregaDomicilioDto.codigoEntrega}`);
        Object.assign(existingRecord, createGeoreferenciaEntregaDomicilioDto);
        return await this.georeferenciaEntregaDomicilioRepository.save(existingRecord);
      }
      const newRegistro = this.georeferenciaEntregaDomicilioRepository.create(createGeoreferenciaEntregaDomicilioDto);
      return await this.georeferenciaEntregaDomicilioRepository.save(newRegistro);

    } catch (error) {
      this.logger.error('Error creating record', error);
      throw error;
    }

  }

  findAll() {
    return `This action returns all georeferenciaEntregaDomicilio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} georeferenciaEntregaDomicilio`;
  }

  update(id: number, updateGeoreferenciaEntregaDomicilioDto: UpdateGeoreferenciaEntregaDomicilioDto) {
    return `This action updates a #${id} georeferenciaEntregaDomicilio`;
  }

  remove(id: number) {
    return `This action removes a #${id} georeferenciaEntregaDomicilio`;
  }
}
