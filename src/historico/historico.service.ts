import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historico } from './historico.entity';

@Injectable()
export class HistoricoService {
  constructor(
    @InjectRepository(Historico)
    private historicoRepository: Repository<Historico>,
  ) {}

  async registrarConsulta(
    usuario: string,
    ip: string,
    cedula: string,
    idUsuario: number,
    apiRC: boolean,
  ): Promise<Historico> {
    // Buscar la última consulta del usuario, si existe
    const historicoAnterior = await this.historicoRepository.findOne({
      where: { usuario },
      order: { fechaConsulta: 'DESC' },
    });

    let cantidadConsultas = 1;

    // Si existe un registro anterior, toma el valor de la cantidadConsultas
    if (historicoAnterior) {
      cantidadConsultas = historicoAnterior.cantidadConsultas + 1;
    }

    // Crear una nueva entrada en la tabla de histórico
    const nuevoHistorico = this.historicoRepository.create({

      usuario,
      cantidadConsultas,
      ip,
      fechaConsulta: new Date(),
      cedulaConsultada: cedula,
      idUsuario: idUsuario,
      apiRC: apiRC,
    });
     /* console.log("nuevoHistorico:",nuevoHistorico);  */

    // Guardar el nuevo registro en la base de datos
    return this.historicoRepository.save(nuevoHistorico);
  }

  async obtenerHistorial(): Promise<Historico[]> {
    return this.historicoRepository.find();
  }
}
