import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioBodega } from './entities/usuario-bodega.entity';
import { Usuario } from './entities/usuario.entity';
import { Almacen } from 'src/almacenes/entities/almacene.entity';
@Injectable()
export class UsuarioBodegaService {
  constructor(
    @InjectRepository(UsuarioBodega)
    private usuarioBodegaRepository: Repository<UsuarioBodega>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

     @InjectRepository(Almacen)
    private almacenRepository: Repository<Almacen>,

  ) {}

  async getBodegasByUser(
    idUsuario: number,
    idTipoFactura: number,
    fecha: Date = new Date(),
    recibeConsignacion: boolean = false,
  ): Promise<{ Codigo: string, Nombre: string, Bodega: number }[]> {
     const queryBuilder = this.almacenRepository
      .createQueryBuilder('b')
      .select(['b.Codigo', 'b.Nombre', 'b.Bodega'])
      .innerJoin(UsuarioBodega, 'ub', 'ub.Bodega = b.Bodega')
      .innerJoin(Usuario, 'u', 'u.idUsuario = ub.idUsuario')
      .where('u.idUsuario = :idUsuario', { idUsuario })
      .andWhere('b.Credito = 1'); // Asegurarse que el usuario tiene crédito en la bodega
    // Ordenar por nombre
    queryBuilder.orderBy('b.Nombre', 'ASC');

    return queryBuilder.getRawMany();
  }
}
