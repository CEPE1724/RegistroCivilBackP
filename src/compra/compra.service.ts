import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './entities/compra.entity'

@Injectable()
export class CompraService {
  private readonly logger = new Logger('CompraService');

  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
  ) { }


  async findAll() {
    return `This action returns a compra`;
  }

  async findOne(idCre_SolicitudWeb: number) {
    const result = await this.compraRepository.find({ where: { idCre_SolicitudWeb, idTipoFactura: 1 } });
    if (!result) {
      return {
        success: false,
        message: `No se encontró ningún documento`,
      };
    }
    return {
      success: true,
      data: result,
    };

  }

  async validaEstadoCompra(numeroIdentificacion: string, bodega: number) {
    const result = await this.compraRepository.findOne(

      {
        where: {
          Ruc: numeroIdentificacion,
          idFormaPago: 9,
          idTipoFactura: 43,
          Borrar: false,
          Bodega: bodega,
          Estado: 1
        }
      });
    if (!result) {
      return {
        success: true,
        message: `No se encontro ninguna PRE-FACTURA ACTIVA para la cédula ${numeroIdentificacion}.`,
      };
    }
    return {
      success: false,
      data: `Se encontró una PRE-FACTURA ACTIVA para la cédula ${numeroIdentificacion}, por favor finalizarla o anularla antes de continuar.`,
    };
  }


}
