import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CboGestorCobranzas } from '../Cbo_Gestor_Cobranzas/cbo-gestor-cobranzas.entity';
import { CboGestores } from './cbo-gestores.entity';
import { CboGestoresEstrategia } from '../Cbo_Gestores_Estrategia/Cbo_Gestores_Estrategia.entity';
import {ResponseDto} from './cbo-gestores.dto';
@Injectable()
export class CboGestoresService {
  constructor(
    @InjectRepository(CboGestores)
    private cboGestoresRepository: Repository<CboGestores>,
  ) {}

  async create(cboGestores: Partial<CboGestores>): Promise<CboGestores> {
    const newCboGestor = this.cboGestoresRepository.create(cboGestores);
    return this.cboGestoresRepository.save(newCboGestor);
  }

 
  async findAll(): Promise<ResponseDto<CboGestores[]>> {
    const cboGestores = await this.cboGestoresRepository.find();
    return new ResponseDto(200, 'Registros obtenidos con éxito', cboGestores);
  }
  async findOne(id: number): Promise<CboGestores> {
    return this.cboGestoresRepository.findOneBy({ idCbo_Gestores: id });
  }

  async update(id: number, cboGestores: Partial<CboGestores>): Promise<CboGestores> {
    await this.cboGestoresRepository.update(id, cboGestores);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cboGestoresRepository.delete(id);
  }
}
