import { Injectable, Logger } from '@nestjs/common';
import { CreateVerificadorcreditoDto } from './dto/create-verificadorcredito.dto';
import { UpdateVerificadorcreditoDto } from './dto/update-verificadorcredito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerificadorCredito } from './entities/verificadorcredito.entity';

@Injectable()
export class VerificadorcreditoService {
  private readonly logger = new Logger('VerificadorcreditoService');

  constructor(
    @InjectRepository(VerificadorCredito)
    private readonly verificadorcreditoRepository: Repository<VerificadorCredito>,
  ) { }




  create(createVerificadorcreditoDto: CreateVerificadorcreditoDto) {
    const existingVerificador = this.verificadorcreditoRepository.findOne({
      where: { Nombre: createVerificadorcreditoDto.Nombre },
    });
    if (existingVerificador) {
      return { message: 'A verifier with this name already exists.' };
    }
    return this.verificadorcreditoRepository.save(createVerificadorcreditoDto);
  }

  findAll() {
    return this.verificadorcreditoRepository.find({
      where: { Estado: 1 },
    });
  }

  findOne(id: number) {
    return this.verificadorcreditoRepository.findOne({
      where: { idVerificadorCredito: id },
    });
  }

  update(id: number, updateVerificadorcreditoDto: UpdateVerificadorcreditoDto) {
    return this.verificadorcreditoRepository.update(id, updateVerificadorcreditoDto);
  }

  remove(id: number) {
    return this.verificadorcreditoRepository.delete(id);
  }
}
