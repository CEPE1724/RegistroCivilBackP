import { Injectable } from '@nestjs/common';
import { CreateListaNegraCellDto } from './dto/create-lista-negra-cell.dto';
import { UpdateListaNegraCellDto } from './dto/update-lista-negra-cell.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListaNegraCell } from './entities/lista-negra-cell.entity';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ListaNegraCellService {
  constructor(
    @InjectRepository(ListaNegraCell)
    private readonly listaNegraRepo: Repository<ListaNegraCell>,
  ) {}

  async create(dto: CreateListaNegraCellDto): Promise<ListaNegraCell> {
    // Validaciones personalizadas
    if (!dto.NumeroCell) {
      throw new BadRequestException('El número de teléfono no puede estar vacío');
    }
  
    if (!/^[0-9]+$/.test(dto.NumeroCell)) {
      throw new BadRequestException('El número solo debe contener dígitos numéricos');
    }
  
    if (dto.NumeroCell.length !== 10) {
      throw new BadRequestException('El número de teléfono debe tener exactamente 10 dígitos');
    }
  
    if (!dto.Descripcion) {
      throw new BadRequestException('La descripción no puede estar vacía');
    }
  
    if (dto.Activo === undefined || dto.Activo === null) {
      throw new BadRequestException('El estado Activo es requerido');
    }
  
    const yaExiste = await this.listaNegraRepo.findOne({
      where: { Telefono: dto.NumeroCell },
    });
  
    if (yaExiste) {
      throw new BadRequestException(`El número ${dto.NumeroCell} ya se encuentra en la lista negra`);
    }
  
    const nuevaEntrada = this.listaNegraRepo.create({
      Telefono: dto.NumeroCell,
      Observacion: dto.Descripcion,
      Activo: dto.Activo,
      Usuario: dto.Usuario,
      FechaSistema: new Date(),
    });
  
    return await this.listaNegraRepo.save(nuevaEntrada);
  }

  async findAll(): Promise<ListaNegraCell[]> {
    return await this.listaNegraRepo.find();
  }

  async findOne(id: number): Promise<ListaNegraCell> {
    const registro = await this.listaNegraRepo.findOne({ where: { idListaNegraCell: id } });
    if (!registro) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
    return registro;
  }

  async updateActivo(id: number, nuevoEstado: boolean): Promise<ListaNegraCell> {
    const registro = await this.findOne(id);
    if (!registro) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
  
    registro.Activo = nuevoEstado;
  
    return await this.listaNegraRepo.save(registro);
  }

  remove(id: number) {
    return `This action removes a #${id} listaNegraCell`;
  }
}
