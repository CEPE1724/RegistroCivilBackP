// src/cbo-gestores/cbo-gestores-estrategia.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CboGestoresEstrategia } from './Cbo_Gestores_Estrategia.entity';

@Injectable()
export class CboGestoresEstrategiaService {
  constructor(
    @InjectRepository(CboGestoresEstrategia)
    private readonly cboGestoresEstrategiaRepository: Repository<CboGestoresEstrategia>,
  ) {}

  // Crear un nuevo CboGestoresEstrategia
  async create(cboGestoresEstrategia: CboGestoresEstrategia): Promise<CboGestoresEstrategia> {
    return this.cboGestoresEstrategiaRepository.save(cboGestoresEstrategia);
  }

  // Obtener todos los CboGestoresEstrategia
  async findAll(): Promise<CboGestoresEstrategia[]> {
    return this.cboGestoresEstrategiaRepository.find();
  }

  
}
