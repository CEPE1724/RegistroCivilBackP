import { Injectable, Logger } from '@nestjs/common';
import { CreateComAsignacionDeVendedoreDto } from './dto/create-com_asignacion-de-vendedore.dto';
import { UpdateComAsignacionDeVendedoreDto } from './dto/update-com_asignacion-de-vendedore.dto';
import { ComAsignacionDeVendedore } from './entities/com_asignacion-de-vendedore.entity';
import { DispositivosApp } from 'src/dispositivos-app/entities/dispositivos-app.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not, IsNull } from 'typeorm';
import { Console } from 'console';
@Injectable()
export class ComAsignacionDeVendedoresService {
  private readonly logger = new Logger('CreSolicitudWebService');

  constructor(
    @InjectRepository(ComAsignacionDeVendedore)
    private readonly repository: Repository<ComAsignacionDeVendedore>,
    @InjectRepository(DispositivosApp)
    private readonly dispositivosAppRepository: Repository<DispositivosApp>
  ) { }

  create(createComAsignacionDeVendedoreDto: CreateComAsignacionDeVendedoreDto) {
    return 'This action adds a new comAsignacionDeVendedore';
  }

  async findAll(bodega: number) {

    const query = this.repository
      .createQueryBuilder('comAsignacionDeVendedores')
      .innerJoinAndSelect('comAsignacionDeVendedores.nomina', 'nomina') // Esto trae los datos de nomina
      .where('comAsignacionDeVendedores.Bodega = :bodega', { bodega })
      .andWhere('comAsignacionDeVendedores.idCom_Estado != :estado', { estado: 2 })
      .andWhere('comAsignacionDeVendedores.idCargo IN (:...cargos)', { cargos: [1, 21] })
      .andWhere('comAsignacionDeVendedores.Desde <= :hoy', { hoy: new Date() })
      .andWhere('comAsignacionDeVendedores.Hasta >= :hoy', { hoy: new Date() })
      .select('nomina.Codigo') // selecciona solo los datos de nomina
      .getRawMany(); // usa getRawMany() para que devuelva solo los datos planos de nomina

    try {
      const result = await query;
      // hacer relacion con DispositivosApp
      if (result.length === 0) {
        this.logger.warn(`0 registros encontrados para bodega ${bodega}`);
        return {
          data: [],
          message: `0 registros encontrados para bodega ${bodega}`,
          status: false
        };
      }

      this.logger.log(`Found ${result.length} records for bodega ${bodega}`);
      const dispositivos = await this.dispositivosAppRepository.find({
        where: {
          UsuarioAPP: In(result.map(item => item.nomina_Codigo)), // asumiendo que Codigo es el campo que relaciona con DispositivosApp
          Empresa: 1, // Filtrar por Empresa 1
          Activo: 1, // Filtrar por Activo 1
          // Filtrar por estados 1 y 2
          TokenExpo: Not(IsNull()) // Asegurarse de que TokenExpo no sea nulo
        }
      });
      const tokens = dispositivos.map(d => d.TokenExpo); // Extrae solo TokenExpo
      if (!tokens) {
        this.logger.warn(`No tokens found for bodega ${bodega}`);
        return {
          data: [],
          message: `No tokens found for bodega ${bodega}`,
          status: false
        };
      }

      return {
        data: tokens,
        message: `Found ${result.length} records for bodega ${bodega}`,
        status: true
      };
    } catch (error) {
      this.logger.error(`Error finding records for bodega ${bodega}: ${error.message}`, error.stack);
      throw error;
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} comAsignacionDeVendedore`;
  }

  update(id: number, updateComAsignacionDeVendedoreDto: UpdateComAsignacionDeVendedoreDto) {
    return `This action updates a #${id} comAsignacionDeVendedore`;
  }

  remove(id: number) {
    return `This action removes a #${id} comAsignacionDeVendedore`;
  }
}
