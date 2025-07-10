import { Injectable } from '@nestjs/common';
import { CreateListaNegraEmailDto } from './dto/create-lista-negra-email.dto';
import { UpdateListaNegraEmailDto } from './dto/update-lista-negra-email.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListaNegraEmail } from './entities/lista-negra-email.entity';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ListaNegraEmailService {
  constructor(
    @InjectRepository(ListaNegraEmail)
    private readonly listaNegraRepo: Repository<ListaNegraEmail>,
  ) {}

  async create(dto: CreateListaNegraEmailDto): Promise<ListaNegraEmail> {
    // Validaciones personalizadas
    if (!dto.Email) {
      throw new BadRequestException('El email no puede estar vacío');
    }
  
    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dto.Email)) {
      throw new BadRequestException('El formato del email no es válido');
    }
  
    if (!dto.Descripcion) {
      throw new BadRequestException('La descripción no puede estar vacía');
    }
  
    if (dto.Activo === undefined || dto.Activo === null) {
      throw new BadRequestException('El estado Activo es requerido');
    }
  
    const yaExiste = await this.listaNegraRepo.findOne({
      where: { Email: dto.Email.toLowerCase() },
    });
  
    if (yaExiste) {
      throw new BadRequestException(`El email ${dto.Email} ya se encuentra en la lista negra`);
    }
  
    const nuevaEntrada = this.listaNegraRepo.create({
      Email: dto.Email.toLowerCase(),
      Observacion: dto.Descripcion,
      Activo: dto.Activo,
      Usuario: dto.Usuario,
      FechaSistema: new Date(),
    });
  
    return await this.listaNegraRepo.save(nuevaEntrada);
  }

  async findAll(): Promise<ListaNegraEmail[]> {
    return await this.listaNegraRepo.find();
  }

  async findOne(id: number): Promise<ListaNegraEmail> {
    const registro = await this.listaNegraRepo.findOne({ where: { idListaNegraEmail: id } });
    if (!registro) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
    return registro;
  }

  async updateActivo(id: number, nuevoEstado: boolean): Promise<ListaNegraEmail> {
    const registro = await this.findOne(id);
    if (!registro) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
  
    registro.Activo = nuevoEstado;
  
    return await this.listaNegraRepo.save(registro);
  }

  async findByEmail(email: string): Promise<number> {
    const count = await this.listaNegraRepo.count({ where: { Email: email.toLowerCase(), Activo : true } });
    return count;
  }
  
  remove(id: number) {
    return `This action removes a #${id} listaNegraEmail`;
  }
}
