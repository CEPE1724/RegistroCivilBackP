import { Injectable } from '@nestjs/common';
import { CreateTerrenaGestionTrabajoDto } from './dto/create-terrena-gestion-trabajo.dto';
import { UpdateTerrenaGestionTrabajoDto } from './dto/update-terrena-gestion-trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TerrenaGestionTrabajo } from './entities/terrena-gestion-trabajo.entity';
import { Logger } from '@nestjs/common';
@Injectable()
export class TerrenaGestionTrabajoService {
private readonly logger = new Logger('TerrenaGestionTrabajoService');
 constructor(
  @InjectRepository(TerrenaGestionTrabajo)
  private readonly terrenaRepo: Repository<TerrenaGestionTrabajo>,
  ) {}

 async findOne(id: number) {
  return await this.terrenaRepo.findOne({ where: { idTerrenaGestionTrabajo: id } });
 }

   async updateTipoVerificacion(id: number, tipoVerificacion: number) {
    await this.terrenaRepo.update({ idTerrenaGestionTrabajo: id }, { tipoVerificacion });
    return this.findOne(id);
  }
}


