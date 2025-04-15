import { Injectable } from '@nestjs/common';
import { CreateDetalleTipoClienteDto } from './dto/create-detalle-tipo-cliente.dto';
import { UpdateDetalleTipoClienteDto } from './dto/update-detalle-tipo-cliente.dto';
import {DetalleTipoCliente} from './entities/detalle-tipo-cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
@Injectable()
export class DetalleTipoClienteService {
 
  private readonly logger = new Logger('DetalleTipoClienteService');

  constructor(
    @InjectRepository(DetalleTipoCliente)
    private readonly detalleTipoClienteRepository: Repository<DetalleTipoCliente>,
  ) { }

  findAll() {

    return this.detalleTipoClienteRepository.find();}


}
