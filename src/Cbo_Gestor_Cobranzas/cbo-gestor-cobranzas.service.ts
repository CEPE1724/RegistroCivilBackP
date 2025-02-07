// src/cbo-gestor/cbo-gestor-cobranzas.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CboGestorCobranzas } from './cbo-gestor-cobranzas.entity';
import { FindAllFiltersDto, ResponseDto } from './cbo-gestor-cobranzas.dto';

@Injectable()
export class CboGestorCobranzasService {
  constructor(
    @InjectRepository(CboGestorCobranzas)
    private cboGestorCobranzasRepository: Repository<CboGestorCobranzas>,
  ) {}

  // Obtener un solo registro por ID
  async findOne(id: number): Promise<CboGestorCobranzas> {
    return this.cboGestorCobranzasRepository.findOneBy({ idCbo_Gestor_Cobranzas: id });
  }

  // Crear un nuevo registro
  async create(data: Partial<CboGestorCobranzas>): Promise<CboGestorCobranzas> {
    const nuevoGestor = this.cboGestorCobranzasRepository.create(data);
    return this.cboGestorCobranzasRepository.save(nuevoGestor);
  }

  // Actualizar un registro por ID
  async update(id: number, data: Partial<CboGestorCobranzas>): Promise<CboGestorCobranzas> {
    await this.cboGestorCobranzasRepository.update(id, data);
    return this.findOne(id);
  }

  // Eliminar un registro por ID
  async remove(id: number): Promise<void> {
    await this.cboGestorCobranzasRepository.delete(id);
  }

  // Obtener todos los registros con filtros y paginación
  async findAll(filters: FindAllFiltersDto): Promise<ResponseDto<CboGestorCobranzas>> {
    const { idCbo_Gestores, idCbo_Gestores_Estrategia, page = 1, limit = 10 } = filters;

    const qb = this.cboGestorCobranzasRepository.createQueryBuilder('g');

    // Agregar filtros si se proporcionan
    if (idCbo_Gestores) {
      qb.andWhere('g.idCbo_Gestores = :idCbo_Gestores', { idCbo_Gestores });
    }

    if (idCbo_Gestores_Estrategia) {
      qb.andWhere('g.idCbo_Gestores_Estrategia = :idCbo_Gestores_Estrategia', { idCbo_Gestores_Estrategia });
    }

    // Paginación
    qb.skip((page - 1) * limit).take(limit);

    // Ejecutar la consulta y obtener los datos
    const [data, totalCount] = await qb.getManyAndCount();

    // Devolver la respuesta en el formato esperado
    return new ResponseDto(data, totalCount, page, limit);
  }
}
