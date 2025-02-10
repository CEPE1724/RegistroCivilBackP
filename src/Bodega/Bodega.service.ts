import { Injectable } from '@nestjs/common';
import { Bodega } from './bodega.entity';
import { In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class BodegaService {

    constructor(
        @InjectRepository(Bodega)
        private BodegaRepository: Repository<Bodega>,
    ) {}

    // obtener todas la sbodegas
    async findAll(): Promise<Bodega[]> {
        return this.BodegaRepository.find({
          where: { Activo: 1, Remates: 0 },  // Filtrar solo las bodegas activas
        });
      }
}
