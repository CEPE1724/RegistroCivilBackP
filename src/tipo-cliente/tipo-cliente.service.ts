import { Injectable } from '@nestjs/common';
import { CreateTipoClienteDto } from './dto/create-tipo-cliente.dto';
import { UpdateTipoClienteDto } from './dto/update-tipo-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { TipoCliente } from './entities/tipo-cliente.entity'; 
@Injectable()
export class TipoClienteService {
  private readonly logger = new Logger('TipoClienteService');
  constructor(
    @InjectRepository(TipoCliente)
    private readonly tipoClienteRepository: Repository<TipoCliente>,
  ) { }
  

  findAll() {
    return this.tipoClienteRepository.find();
  }

}
