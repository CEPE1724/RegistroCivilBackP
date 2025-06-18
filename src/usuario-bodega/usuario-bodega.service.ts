import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bodega } from './entities/bodega.entity';
import { UsuarioBodega } from './entities/usuario-bodega.entity';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioBodegaService {
  constructor(
    @InjectRepository(UsuarioBodega)
    private usuarioBodegaRepository: Repository<UsuarioBodega>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Bodega)
    private bodegaRepository: Repository<Bodega>,
  ) {}

  async getBodegasByUser(
    idUsuario: number,
    idTipoFactura: number,
    fecha: Date = new Date(),
    recibeConsignacion: boolean = false,
  ): Promise<{ Codigo: string, Nombre: string, Bodega: number }[]> {
    const queryBuilder = this.bodegaRepository
      .createQueryBuilder('b')
      .select(['b.Codigo', 'b.Nombre', 'b.Bodega'])
      .innerJoin(UsuarioBodega, 'ub', 'ub.Bodega = b.Bodega')
      .innerJoin(Usuario, 'u', 'u.idUsuario = ub.idUsuario')
      .where('u.idUsuario = :idUsuario', { idUsuario })
      .where('b.CrediDigital = 1')

    // Condiciones basadas en `idTipoFactura`
    if (![3, 47].includes(idTipoFactura)) {
      queryBuilder.andWhere('CAST(:fecha AS DATE) BETWEEN b.FechaApertura AND COALESCE(b.FechaCierre, \'2030-12-31\')', { fecha });
    }

    if (idTipoFactura === 47 && idUsuario !== 1) {
      queryBuilder.andWhere('CAST(:fecha AS DATE) BETWEEN b.FechaApertura AND COALESCE(b.FechaCierre, \'2030-12-31\')', { fecha });
    }

    if ([1, 5, 13, 43].includes(idTipoFactura)) {
      queryBuilder.andWhere('b.Factura = 1 AND b.Consignacion = 0');
    }

    if (idTipoFactura === 11) {
      queryBuilder.andWhere('b.Factura = 1 AND b.Consignacion = 0');
    }

    if (idTipoFactura === 43) {
      queryBuilder.andWhere('b.Credito = 1 AND b.Consignacion = 0');
    }

    if ([2, 4].includes(idTipoFactura)) {
      queryBuilder.andWhere('b.Compras = 1 AND b.Inventario = 1 AND b.Consignacion = 0');
    }

    if (idTipoFactura === 6) {
      queryBuilder.andWhere('b.NCP = 1 AND b.Consignacion = 0');
    }

    if ([24, 45, 46].includes(idTipoFactura)) {
      queryBuilder.andWhere('b.Caja = 1 AND b.Consignacion = 0');
    }

    if (idTipoFactura === 25) {
      queryBuilder.andWhere('b.Bodega = 1 AND b.Consignacion = 0');
    }

    if (idTipoFactura === 42) {
      queryBuilder.andWhere('b.Transferencia = 1');
    }

    if ([8, 9].includes(idTipoFactura)) {
      queryBuilder.andWhere('b.Inventario = 1 AND b.Consignacion = 0');
    }

    if (idTipoFactura === 47) {
      queryBuilder.andWhere('b.Inventario = 1');
    }

    if ([36, 67].includes(idTipoFactura)) {
      queryBuilder.andWhere('b.Inventario = 1');
    }

    if (idTipoFactura === 36 && recibeConsignacion) {
      queryBuilder.andWhere('b.RecibeConsignacion = 1');
    }

    if (idTipoFactura === 48) {
      queryBuilder.andWhere('b.Inventario = 1 AND b.Transferencia = 1 AND b.Consignacion = 0');
    }

    if ([50, 53, 54].includes(idTipoFactura)) {
      queryBuilder.andWhere('b.DT = 1');
    }

    if (idTipoFactura === 55) {
      queryBuilder.andWhere('b.ImprimePrecios = 1 AND b.Consignacion = 0');
    }

    if (idTipoFactura === 57) {
      queryBuilder.andWhere('b.DT = 1 AND b.Credito = 0 AND b.Inventario = 1');
    }

    if (idTipoFactura === 11) {
      queryBuilder.andWhere('b.Bodega IN (1, 101)');
    }

    if (idTipoFactura === 75) {
      queryBuilder.andWhere('b.Bodega = 1');
    }

    if (idTipoFactura === 90) {
      queryBuilder.andWhere('b.Factura = 1 AND b.Consignacion = 0 AND COALESCE(b.PointMovil, 0) = 1');
    }

    if (idTipoFactura === 999) {
      queryBuilder.andWhere('b.Bodega IN (20, 95)');
    }

    // Ordenar por nombre
    queryBuilder.orderBy('b.Nombre', 'ASC');

    return queryBuilder.getRawMany();
  }
}
