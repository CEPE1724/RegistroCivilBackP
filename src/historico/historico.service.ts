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
    try {
      console.log(`🔍 Buscando registros previos para el usuario: ${usuario}`);
  
      const existeRegistro = await this.historicoRepository.count({
        where: { usuario, cedulaConsultada: cedula, idUsuario, apiRC },
      });
  
      if (existeRegistro > 0) {
        console.log("✅ Registro idéntico encontrado. Buscando detalles...");
  
        const ultimoHistorico = await this.historicoRepository.findOne({
          where: { usuario, cedulaConsultada: cedula, idUsuario, apiRC },
          order: { fechaConsulta: 'DESC' },
        });
  
        if (ultimoHistorico) {
          console.log("🔄 Actualizando registro existente...");
  
          return this.historicoRepository.save({
            ...ultimoHistorico,
            cantidadConsultas: ultimoHistorico.cantidadConsultas + 1,
            fechaConsulta: new Date(),
            ip, 
          });
        }
      }
  
      console.log("⚠️ No se encontró un registro idéntico. Creando uno nuevo...");
  
      const nuevoHistorico = this.historicoRepository.create({
        usuario,
        cantidadConsultas: 1,
        ip,
        fechaConsulta: new Date(),
        cedulaConsultada: cedula,
        idUsuario,
        apiRC,
      });
  
      return this.historicoRepository.save(nuevoHistorico);
    } catch (error) {
      console.error("❌ Error al registrar consulta:", error);
      throw new Error("No se pudo registrar la consulta. Inténtalo nuevamente.");
    }
  }
  
  

  async obtenerHistorial(): Promise<Historico[]> {
    return this.historicoRepository.find();
  }
}
