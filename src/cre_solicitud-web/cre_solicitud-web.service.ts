import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Brackets, In, Repository } from 'typeorm';
import { CreateCreSolicitudWebDto } from './dto/create-cre_solicitud-web.dto';
import { UpdateCreSolicitudWebDto } from './dto/update-cre_solicitud-web.dto';
import { CreSolicitudWeb } from './entities/cre_solicitud-web.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthService } from 'src/cognosolicitudcredito/auth/auth.service';   
@Injectable()
export class CreSolicitudWebService { 

  private readonly logger = new Logger('CreSolicitudWebService');

  constructor(
    @InjectRepository(CreSolicitudWeb)
    private readonly creSolicitudWebRepository: Repository<CreSolicitudWeb>,
    private readonly authService: AuthService
  ) { }

  async create(createCreSolicitudWebDto: CreateCreSolicitudWebDto) {

    try {
      console.log('createCreSolicitudWebDto', createCreSolicitudWebDto);
      const creSolicitudWeb = this.creSolicitudWebRepository.create(createCreSolicitudWebDto);
      await this.creSolicitudWebRepository.save(creSolicitudWeb);
      /* obtener el id de la solicitud creada y cedula */
      const idSolicitud = creSolicitudWeb.idCre_SolicitudWeb;
      const cedula = creSolicitudWeb.Cedula;
      const token = await this.authService.getToken(cedula); // Llamada a AuthService para obtener el token

      // Llamamos a getApiData con el token obtenido
      const apiData = await this.authService.getApiData(token, cedula);

      // Lógica adicional para manejar los datos obtenidos
      const apiDataTrabajo = await this.authService.getApiDataTrabajo(token, cedula);
      let bApiDataTrabajo = false;

      if (apiDataTrabajo.trabajos) {
        bApiDataTrabajo = apiDataTrabajo.trabajos.length > 0;
      }

      // Guardamos los datos
      const saveData = await this.authService.create(apiData, bApiDataTrabajo, idSolicitud);

      const saveDataNatural = await this.authService.createNatural(apiData, saveData.idCognoSolicitudCredito, 0);

      if (apiData.personaNaturalConyuge.personaConyuge.identificacion && apiData.personaNaturalConyuge.personaConyuge.nombre) {
        if (apiData.personaNaturalConyuge.personaConyuge.identificacion !== null && apiData.personaNaturalConyuge.personaConyuge.nombre !== '') {
          console.log('saveData.idCognoSolicitudCredito', saveData.idCognoSolicitudCredito);
          await this.authService.createNaturalConyugue(apiData, saveData.idCognoSolicitudCredito, 1);
        }
      }

      // Crear lugar de nacimiento
      await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 0);

      // Domicilio del cónyuge
      if (apiData.estadoCivil.estadoCivil.descripcion === 'CASADO') {
        console.log('conyugue');
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 1);
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 2);
      }

      // Crear nacionalidades, profesiones y trabajos
      await this.authService.createNacionalidades(apiData, saveData.idCognoSolicitudCredito);
      await this.authService.createProfesiones(apiData, saveData.idCognoSolicitudCredito);

      if (bApiDataTrabajo) {
        await this.authService.createTrabajo(apiDataTrabajo, saveData.idCognoSolicitudCredito);
      }


      return creSolicitudWeb;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, Filtro = '' } = paginationDto;

    let creSolicitudWeb: CreSolicitudWeb[];

    const queryBuilder = this.creSolicitudWebRepository.createQueryBuilder('cre_solicitud_web');

    // Solo agregar el filtro si Filtro tiene un valor
    if (Filtro) {
      console.log('Filtro', Filtro);

      // Aplica un filtro a las columnas
      queryBuilder.where(
        new Brackets(qb => {
          qb.where('LOWER(cre_solicitud_web.NumeroSolicitud) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` })
            .orWhere('LOWER(cre_solicitud_web.Cedula) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` })
            .orWhere('LOWER(cre_solicitud_web.Apellidos) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` })
            .orWhere('LOWER(cre_solicitud_web.Nombres) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` })
            .orWhere('LOWER(cre_solicitud_web.Celular) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` })
            .orWhere('LOWER(cre_solicitud_web.Email) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` });
        })
      );
    }

    // Aplicar la paginación
    const totalCount = await queryBuilder.getCount();

    // Aplicar la paginación
    queryBuilder.skip(offset).take(limit);

    // Ejecutar la consulta para obtener los registros
    creSolicitudWeb = await queryBuilder.getMany();

    if (creSolicitudWeb.length === 0) {
      throw new NotFoundException('No se encontraron registros');
    }

    // Devolver los registros junto con el total de registros
    return {
      data: creSolicitudWeb,
      total: totalCount, // Total de registros sin paginación
    };
  }

  findOne(id: number) {
    return this.creSolicitudWebRepository.findOne({where: {idCre_SolicitudWeb: id}});
  }

  async update(idCre_SolicitudWeb: number, updateCreSolicitudWebDto: UpdateCreSolicitudWebDto) {
    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb } });
    if (!creSolicitudWeb) {
      throw new NotFoundException('Registro no encontrado');
    }
    try {
      this.creSolicitudWebRepository.merge(creSolicitudWeb, updateCreSolicitudWebDto);
      await this.creSolicitudWebRepository.save(creSolicitudWeb);
      return creSolicitudWeb;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} creSolicitudWeb`;
  }

  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error');

  }
}
