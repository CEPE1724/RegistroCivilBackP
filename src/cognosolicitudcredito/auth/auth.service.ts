import {
    BadRequestException, ConsoleLogger, Injectable,
    InternalServerErrorException,
    Logger, NotFoundException
} from '@nestjs/common';
import { Brackets, In, Repository } from 'typeorm';
import axios from 'axios';
import * as qs from 'qs';  // Asegúrate de tener instalado qs
import { CreateCognosolicitudcreditoDto } from '../dto/create-cognosolicitudcredito.dto';
import { CreateCognopersonanaturalDto } from '../dto/create-cognopersonanatural.dto';
import { CreateCognosolicitudnacionalidadesDto } from '../dto/create-cognosolicitudnacionalidades.dto';
import { Cognosolicitudcredito } from '../entities/cognosolicitudcredito.entity';
import { CognoPersonaNatural } from '../entities/cognopersonanatural.entity';
import { CognoSolicitudNacionalidades } from '../entities/cognosolicitudnacionalidades.entity';
import { CreateCognosolicitudprofesionesDto } from '../dto/create-cognosolicitudprofesiones.dto';
import { CognoSolicitudLugarNacimiento } from '../entities/cognosolicitudlugarnacimiento.entity';
import { CognoSolicitudProfesiones } from '../entities/cognosolicitudprofesiones.entity';
import { CognoTrabajo } from '../entities/cognotrabajo.entity';
import { CreateCognoTrabajoDto } from '../dto/create-cognotrabajo.dto';
import { CognoDeudaEmov } from '../entities/deudaEmov/cognoDeudaEmov.entity';
import { CognoInfraccion } from '../entities/deudaEmov/cognoInfraccion.entity';
import { CognoDetalleRubro } from '../entities/deudaEmov/cognoDetalleRubro.entity';
import { CognoIssfacCertMedico } from '../entities/afiliaciones/cognoIssfacCertMedico.entity';
import { CognoAfiliacionIess } from '../entities/afiliacion_iess/cognoAfiliacionIess.entity';
import { CognoAfiliacionIessEmpresa } from '../entities/afiliacion_iess/cognoAfiliacionIessEmpresa.entity';

import { DeudaEmovDto } from '../dto/deudaEmov/deuda-emov.dto';
import { AfiliacionesDto } from '../dto/afiliaciones/afiliaciones.dto';
import { AfiliacionIessDto } from '../dto/afiliacion_iess/afiliacionesIess.dto';
import { JubiladoResponse } from '../interfaces/jubilado-response.interfaces';

import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
@Injectable()
export class AuthService {
    private readonly logger = new Logger('AuthServiceCogno');
    private readonly keycloakUrl = process.env.KEYCLOAK_URL;
    private readonly clientId = process.env.KEYCLOAK_CLIENT_ID;
    private readonly username = process.env.KEYCLOAK_USERNAME;
    private readonly password = process.env.KEYCLOAK_PASSWORD;
    private readonly apiCognopn_inf_basica = process.env.API_COGNOPN_INF_BASICA;
    private readonly apiCognopn_trabajos = process.env.API_COGNOPN_TRABAJOS;
    private readonly apiCognopn_deudas_emov = process.env.API_COGNOPN_DEUDAS_EMOV;
    private readonly apiCognopn_afiliciacion_issfac_cert_medico = process.env.API_COGNOEMP_PN_AFILILIACION_ISSFAC_CERT_MEDICO;
    private readonly apiCognopn_afiliciacion_iess = process.env.API_COGNOEMP_PN_AFILILIACION_IESS;
    private readonly apiCognopn_jubilado = process.env.API_COGNOPN_JUBILADO;
    constructor(
        @InjectRepository(Cognosolicitudcredito)
        private readonly cognosolicitudcreditoRepository: Repository<Cognosolicitudcredito>,

        @InjectRepository(CognoPersonaNatural)
        private readonly cognoPersonaNaturalRepository: Repository<CognoPersonaNatural>,

        @InjectRepository(CognoSolicitudLugarNacimiento)
        private readonly cognoSolicitudLugarNacimientoRepository: Repository<CognoSolicitudLugarNacimiento>,

        @InjectRepository(CognoSolicitudNacionalidades)
        private readonly cognoSolicitudNacionalidadesRepository: Repository<CognoSolicitudNacionalidades>,

        @InjectRepository(CognoSolicitudProfesiones)
        private readonly cognoSolicitudProfesionesRepository: Repository<CognoSolicitudProfesiones>,

        @InjectRepository(CognoTrabajo)
        private readonly cognoTrabajoRepository: Repository<CognoTrabajo>,

        @InjectRepository(CognoDeudaEmov)
        private readonly cognoDeudaEmovRepository: Repository<CognoDeudaEmov>,

        @InjectRepository(CognoInfraccion)
        private readonly cognoInfraccionRepository: Repository<CognoInfraccion>,

        @InjectRepository(CognoDetalleRubro)
        private readonly cognoDetalleRubroRepository: Repository<CognoDetalleRubro>,

        @InjectRepository(CognoIssfacCertMedico)
        private readonly cognoIssfacCertMedicoRepository: Repository<CognoIssfacCertMedico>,

        @InjectRepository(CognoAfiliacionIess)
        private readonly cognoAfiliacionIessRepository: Repository<CognoAfiliacionIess>,

        @InjectRepository(CognoAfiliacionIessEmpresa)
        private readonly cognoAfiliacionIessEmpresaRepository: Repository<CognoAfiliacionIessEmpresa>,

    ) { }


    async getToken(cedula: string): Promise<string> {
        try {
            const data = qs.stringify({
                username: this.username,
                password: this.password,
                client_id: this.clientId,
                grant_type: 'password',
            });

            const response = await axios.post(this.keycloakUrl, data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            if (response.data && response.data.access_token) {
                return response.data.access_token;
            }

            // Si no hay token en la respuesta
            return null;
        } catch (error) {
            this.logger.error('Error al obtener el token:', error.message);
            return null; // Indicamos que falló
        }
    }


    // Método para consumir la API externa usando el token y la cédula como parámetro en la URL
    async getApiData(token: string, cedula: string): Promise<any> {
        try {
            const url = `${this.apiCognopn_inf_basica}${cedula}`;

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = response.data;
            console.log('Response from API:', data); // Para depuración

            // Validar si viene un código de error
            if (data?.estado?.codigo === 'ERROR') {
                // Retorna un objeto que indique fallo controlado
                return { success: false, mensaje: data.estado.mensaje || 'Error en API externa' };
            }

            // Si no hay error, retornar los datos esperados
            return { success: true, data };
        } catch (error) {
            console.error('Error al obtener datos de la API externa:', error.message);
            return { success: false, mensaje: 'No se pudo conectar COGNO' };
        }
    }

    async getApiDataFind(token: string, cedula: string): Promise<any> {

        try {
            // Realizamos la solicitud a la API externa usando el token
            const url = `${this.apiCognopn_inf_basica}${cedula}`;  // Concatenamos la cédula en la URL

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Pasamos el token como Bearer
                },
            });

            if (response.data) {
                return response.data;  // Retornamos los datos de la API
            }

            throw new InternalServerErrorException('Error al obtener datos de la API');
        } catch (error) {
            console.error(error);
            this.handleDBException(error);
        }
    }

    async getApiDataTrabajo(token: string, cedula: string): Promise<{ success: boolean, mensaje?: string, data?: any }> {
        try {
            const url = `${this.apiCognopn_trabajos}${cedula}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            // console.log('Response from API Trabajo:', data.trabajos);

            // Si el API responde con un error de negocio
            if (data?.estado?.codigo === 'ERROR') {
                return {
                    success: false,
                    mensaje: data.estado.mensaje || 'Error en API de trabajo',
                };
            }

            // Aunque trabajos esté vacío, si el estado es OK, es válido
            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error('Error al obtener datos de empleo desde API:', error.message);
            return {
                success: false,
                mensaje: 'No se pudo conectar con la API de empleo',
            };
        }
    }

    async getApiDataJubilado(token: string, cedula: string): Promise<JubiladoResponse> {
        try {
            const url = `${this.apiCognopn_jubilado}${cedula}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            // console.log('Response from API Trabajo:', data.trabajos);
            console.log('Response from API Jubilado:', data.estado);
            // Si el API responde con un error de negocio
            if (data?.estado?.codigo === 'ERROR') {
                return {
                    success: false,
                    mensaje: data.estado.mensaje || 'Error en API de trabajo',
                };
            }

            // Aunque trabajos esté vacío, si el estado es OK, es válido
            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error('Error al obtener datos de jubilado desde API:', error.message);
            return {
                success: false,
                mensaje: 'No se pudo conectar con la API de jubilado',
            };
        }
    }

    async getApiIssfacCertMedico(token: string, cedula: string): Promise<{ success: boolean, mensaje?: string, data?: any }> {
        try {
            const url = `${this.apiCognopn_afiliciacion_issfac_cert_medico}${cedula}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            // console.log('Response from API Deuda Emov:', data);

            // Si el API responde con un error de negocio
            if (data?.estado?.codigo === 'ERROR') {
                return {
                    success: false,
                    mensaje: data.estado.mensaje || 'Error en API de deuda EMOV',
                };
            }

            // Aunque trabajos esté vacío, si el estado es OK, es válido
            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error('Error al obtener datos de deuda EMOV desde API:', error.message);
            return {
                success: false,
                mensaje: 'No se pudo conectar con la API de deuda EMOV',
            };
        }
    }

    async getafilicacion_iess(token: string, cedula: string): Promise<{ success: boolean, mensaje?: string, data?: any }> {
        try {
            const url = `${this.apiCognopn_afiliciacion_iess}${cedula}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            // console.log('Response from API Deuda Emov:', data);

            // Si el API responde con un error de negocio
            if (data?.estado?.codigo === 'ERROR') {
                return {
                    success: false,
                    mensaje: data.estado.mensaje || 'Error en API de deuda afilicacion_iess',
                };
            }

            // Aunque trabajos esté vacío, si el estado es OK, es válido
            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error('Error al obtener datos de deuda EMOV desde API:', error.message);
            return {
                success: false,
                mensaje: 'No se pudo conectar con la API de deuda EMOV',
            };
        }
    }


    async getApiDataDeudaEmov(token: string, cedula: string): Promise<{ success: boolean, mensaje?: string, data?: any }> {
        try {
            const url = `${this.apiCognopn_deudas_emov}${cedula}`;

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = response.data;
            // console.log('Response from API Deuda Emov:', data);

            // Si el API responde con un error de negocio
            if (data?.estado?.codigo === 'ERROR') {
                return {
                    success: false,
                    mensaje: data.estado.mensaje || 'Error en API de deuda EMOV',
                };
            }

            // Aunque trabajos esté vacío, si el estado es OK, es válido
            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error('Error al obtener datos de deuda EMOV desde API:', error.message);
            return {
                success: false,
                mensaje: 'No se pudo conectar con la API de deuda EMOV',
            };
        }
    }


    async create(apiData: any, bApiDataTrabajo: boolean, numberId: number): Promise<Cognosolicitudcredito> {
        try {

            const existingRecord = await this.cognosolicitudcreditoRepository.findOne({
                where: { Cedula: apiData.personaNatural.identificacion, idCre_SolicitudWeb: numberId },
            });

            const FechaActualizacion = new Date();
            if (existingRecord) {

                existingRecord.idCre_SolicitudWeb = numberId;
                existingRecord.Codigo = apiData.estado.codigo;
                existingRecord.Mensaje = apiData.estado.mensaje;
                existingRecord.FechaActualizacion = FechaActualizacion;
                existingRecord.bInfoPersonal = true;
                existingRecord.bInfoLaboral = bApiDataTrabajo;
                await this.cognosolicitudcreditoRepository.save(existingRecord);

                return existingRecord;
            } else {
                const createCognosolicitudcreditoDto: CreateCognosolicitudcreditoDto = {
                    idCre_SolicitudWeb: numberId,
                    Cedula: apiData.personaNatural.identificacion,
                    Codigo: apiData.estado.codigo,
                    Mensaje: apiData.estado.mensaje,
                    FechaActualizacion: FechaActualizacion,
                    bInfoPersonal: true,
                    bInfoLaboral: bApiDataTrabajo,
                };

                const newRecord = this.cognosolicitudcreditoRepository.create(createCognosolicitudcreditoDto);

                await this.cognosolicitudcreditoRepository.save(newRecord);
                // Validamos si existe la persona natural en la base de datos
                return newRecord;
            }
        } catch (error) {
            this.handleDBException(error);
        }

    }

    async createNatural(apiData: any, idCognoSolicitudCredito: number, Tipo: number): Promise<CognoPersonaNatural> {
        try {
            /// veirificar si existe la persona natural
            const existingRecord = await this.cognoPersonaNaturalRepository.findOne({
                where: { idCognoSolicitudCredito: idCognoSolicitudCredito },
            });

            /* titutlar*/
            if (existingRecord) {
                // Actualizamos los datos si ya existe
                existingRecord.idCognoSolicitudCredito = idCognoSolicitudCredito;
                existingRecord.identificacion = apiData.personaNatural.identificacion;
                existingRecord.nombre = apiData.personaNatural.nombre;
                existingRecord.nombreUno = apiData.personaNatural.nombreUno;
                existingRecord.nombreDos = apiData.personaNatural.nombreDos;
                existingRecord.idTipoIdentificacion = apiData.personaNatural.tipoIdentificacion.idTipoIdentificacion;
                existingRecord.descripcion = apiData.personaNatural.tipoIdentificacion.descripcion;
                existingRecord.fechaNacimiento = apiData.personaNatural.fechaNacimiento;
                existingRecord.fechaDefuncion = apiData.personaNatural.fechaDefuncion;
                existingRecord.informacionAdicional = apiData.personaNatural.informacionAdicional;
                existingRecord.idGenero = apiData.personaNatural.genero.idGenero;
                existingRecord.Genero = apiData.personaNatural.genero.descripcion;
                existingRecord.lugarDefuncion = apiData.personaNatural.lugarDefuncion;
                existingRecord.apellidoUno = apiData.personaNatural.apellidoUno;
                existingRecord.apellidoDos = apiData.personaNatural.apellidoDos;

                existingRecord.idEstadoCivil = apiData.estadoCivil.estadoCivil.idEstadoCivil;
                existingRecord.EstadoCivil = apiData.estadoCivil.estadoCivil.descripcion;

                existingRecord.fechaMatrimonio = apiData.personaNaturalConyuge.fechaMatrimonio;

                // Validar si nivelEducacion existe y no es null
                if (apiData.nivelEducacion && apiData.nivelEducacion.nivelEducacion) {
                    existingRecord.idNivelEducacion = apiData.nivelEducacion.nivelEducacion.idNivelEducacion;
                    existingRecord.NivelEducacion = apiData.nivelEducacion.nivelEducacion.descripcion;
                    existingRecord.nivel = apiData.nivelEducacion.nivelEducacion.nivel;
                } else {
                    existingRecord.idNivelEducacion = 0;
                    existingRecord.NivelEducacion = '';
                    existingRecord.nivel = 0;
                }

                existingRecord.Tipo = Tipo;

                await this.cognoPersonaNaturalRepository.save(existingRecord);
                return existingRecord;
            } else {
                // Creamos un nuevo registro si no existe
                const createCognopersonanaturalDto: CreateCognopersonanaturalDto = {
                    idCognoSolicitudCredito: idCognoSolicitudCredito,
                    identificacion: apiData.personaNatural.identificacion,
                    nombre: apiData.personaNatural.nombre,
                    nombreUno: apiData.personaNatural.nombreUno,
                    nombreDos: apiData.personaNatural.nombreDos,
                    idTipoIdentificacion: apiData.personaNatural.tipoIdentificacion.idTipoIdentificacion,
                    descripcion: apiData.personaNatural.tipoIdentificacion.descripcion,
                    fechaNacimiento: apiData.personaNatural.fechaNacimiento,
                    fechaDefuncion: apiData.personaNatural.fechaDefuncion,
                    informacionAdicional: apiData.personaNatural.informacionAdicional,
                    idGenero: apiData.personaNatural.genero.idGenero,
                    Genero: apiData.personaNatural.genero.descripcion,
                    lugarDefuncion: apiData.personaNatural.lugarDefuncion,
                    apellidoUno: apiData.personaNatural.apellidoUno,
                    apellidoDos: apiData.personaNatural.apellidoDos,
                    idEstadoCivil: apiData.estadoCivil.estadoCivil.idEstadoCivil,
                    EstadoCivil: apiData.estadoCivil.estadoCivil.descripcion,
                    fechaMatrimonio: apiData.personaNaturalConyuge.fechaMatrimonio,
                    // Validar si nivelEducacion existe y no es null
                    idNivelEducacion: apiData.nivelEducacion?.nivelEducacion?.idNivelEducacion || 0,
                    NivelEducacion: apiData.nivelEducacion?.nivelEducacion?.descripcion || '',
                    nivel: apiData.nivelEducacion?.nivelEducacion?.nivel || 0,
                    Tipo: 0,
                };
                const newRecord = this.cognoPersonaNaturalRepository.create(createCognopersonanaturalDto);
                await this.cognoPersonaNaturalRepository.save(newRecord);
                return newRecord;
            }
        } catch (error) {
            this.handleDBException(error);
        }
    }

    async createNaturalConyugue(apiData: any, idCognoSolicitudCredito: number, Tipo: number): Promise<CognoPersonaNatural> {
        try {
            // console.log('createNaturalConyugue', apiData.personaNaturalConyuge, idCognoSolicitudCredito, Tipo);
            // console.log('createNaturalConyugue', apiData.personaNaturalConyuge, idCognoSolicitudCredito, Tipo);
            /// veirificar si existe la persona natural
            const existingRecord = await this.cognoPersonaNaturalRepository.findOne({
                where: { idCognoSolicitudCredito: idCognoSolicitudCredito, Tipo: Tipo },
            });
            const nombreParroquia = apiData?.personaNaturalConyuge?.personaConyuge?.lugarDefuncion?.parroquia?.nombre ?? '';
            console.log('idCognoSolicitudCredito', nombreParroquia, 'Tipo', Tipo);


            /* titutlar*/
            if (existingRecord) {
                //console.log('existingRecord', existingRecord);
                // Actualizamos los datos si ya existe
                existingRecord.idCognoSolicitudCredito = idCognoSolicitudCredito;
                existingRecord.identificacion = apiData.personaNaturalConyuge.personaConyuge.identificacion;
                existingRecord.nombre = apiData.personaNaturalConyuge.personaConyuge.nombre;
                existingRecord.nombreUno = apiData.personaNaturalConyuge.personaConyuge.nombreUno;
                existingRecord.nombreDos = apiData.personaNaturalConyuge.personaConyuge.nombreDos;
                existingRecord.idTipoIdentificacion = apiData.personaNaturalConyuge.personaConyuge.tipoIdentificacion.idTipoIdentificacion;
                existingRecord.descripcion = apiData.personaNaturalConyuge.personaConyuge.tipoIdentificacion.descripcion;
                existingRecord.fechaNacimiento = apiData.personaNaturalConyuge.personaConyuge.fechaNacimiento;
                existingRecord.fechaDefuncion = apiData.personaNaturalConyuge.personaConyuge.fechaDefuncion;
                existingRecord.informacionAdicional = apiData.personaNaturalConyuge.personaConyuge.informacionAdicional;
                existingRecord.idGenero = apiData.personaNaturalConyuge.personaConyuge.genero.idGenero;
                existingRecord.Genero = apiData.personaNaturalConyuge.personaConyuge.genero.descripcion;
                existingRecord.lugarDefuncion = nombreParroquia; // Asignar lugarDefuncion solo si es válido

                existingRecord.apellidoUno = apiData.personaNaturalConyuge.personaConyuge.apellidoUno;
                existingRecord.apellidoDos = apiData.personaNaturalConyuge.personaConyuge.apellidoDos;

                existingRecord.idEstadoCivil = 2;
                existingRecord.EstadoCivil = 'CASADO';

                existingRecord.fechaMatrimonio = apiData.personaNaturalConyuge.fechaMatrimonio;

                existingRecord.idNivelEducacion = 0;
                existingRecord.NivelEducacion = '';
                existingRecord.nivel = 0

                existingRecord.Tipo = Tipo;

                await this.cognoPersonaNaturalRepository.save(existingRecord);
                return existingRecord;
            } else {

                // Creamos un nuevo registro si no existe
                const createCognopersonanaturalDto: CreateCognopersonanaturalDto = {
                    idCognoSolicitudCredito: idCognoSolicitudCredito,
                    identificacion: apiData.personaNaturalConyuge.personaConyuge.identificacion,
                    nombre: apiData.personaNaturalConyuge.personaConyuge.nombre,
                    nombreUno: apiData.personaNaturalConyuge.personaConyuge.nombreUno,
                    nombreDos: apiData.personaNaturalConyuge.personaConyuge.nombreDos,
                    idTipoIdentificacion: apiData.personaNaturalConyuge.personaConyuge.tipoIdentificacion.idTipoIdentificacion,
                    descripcion: apiData.personaNaturalConyuge.personaConyuge.tipoIdentificacion.descripcion,
                    fechaNacimiento: apiData.personaNaturalConyuge.personaConyuge.fechaNacimiento,
                    fechaDefuncion: apiData.personaNaturalConyuge.personaConyuge.fechaDefuncion,
                    informacionAdicional: apiData.personaNaturalConyuge.personaConyuge.informacionAdicional,
                    idGenero: apiData.personaNaturalConyuge.personaConyuge.genero.idGenero,
                    Genero: apiData.personaNaturalConyuge.personaConyuge.genero.descripcion,
                    lugarDefuncion: nombreParroquia, // Asignar lugarDefuncion solo si es válido

                    apellidoUno: apiData.personaNaturalConyuge.personaConyuge.apellidoUno,
                    apellidoDos: apiData.personaNaturalConyuge.personaConyuge.apellidoDos,

                    idEstadoCivil: 2,
                    EstadoCivil: 'CASADO',
                    fechaMatrimonio: apiData.personaNaturalConyuge.fechaMatrimonio,
                    idNivelEducacion: 0,
                    NivelEducacion: '',
                    nivel: 0,
                    Tipo: Tipo,
                };
                const newRecord = this.cognoPersonaNaturalRepository.create(createCognopersonanaturalDto);
                await this.cognoPersonaNaturalRepository.save(newRecord);
                console.log('newRecord', newRecord);
                return newRecord;
            }
        } catch (error) {
            this.handleDBException(error);
        }
    }

    async createLugarNacimiento(apiData: any, idCognoSolicitudCredito: number, Tipo: number): Promise<CognoSolicitudLugarNacimiento> {
        try {
            const existingRecord = await this.cognoSolicitudLugarNacimientoRepository.findOne({
                where: { idCognoSolicitudCredito, Tipo },
            });

            let tipoJsoncogno = apiData?.personaNatural?.lugarNacimiento;

            if (Tipo === 1) {
                tipoJsoncogno = apiData?.personaNaturalConyuge?.personaConyuge?.lugarNacimiento;
            }

            if (Tipo === 2) {
                tipoJsoncogno = apiData?.personaNaturalConyuge?.lugar;
            }

            // ⚠️ Validar que tipoJsoncogno sea un objeto válido
            if (!tipoJsoncogno || typeof tipoJsoncogno !== 'object') {
                console.warn(`⚠️ No se encontró lugarNacimiento válido para Tipo=${Tipo}`);
                return null; // Salir temprano sin guardar nada
            }

            console.log('tipoJsoncogno', tipoJsoncogno, 'idCognoSolicitudCredito', idCognoSolicitudCredito, 'Tipo', Tipo);

            const lugarData = {
                idCognoSolicitudCredito,
                idLugar: tipoJsoncogno.idLugar || 0,
                codigoPostal: tipoJsoncogno.codigoPostal,
                fechaActualizacion: tipoJsoncogno.fechaActualizacion || null,
                idPais: tipoJsoncogno.parroquia?.canton?.provincia?.pais?.idPais || 0,
                Pais: tipoJsoncogno.parroquia?.canton?.provincia?.pais?.nombre || '',
                codigoAreaPais: tipoJsoncogno.parroquia?.canton?.provincia?.pais?.codigoArea || '',
                codigoIso2: tipoJsoncogno.parroquia?.canton?.provincia?.pais?.codigoIso2 || '',
                codigoIso3: tipoJsoncogno.parroquia?.canton?.provincia?.pais?.codigoIso3 || '',
                codigoIso: tipoJsoncogno.parroquia?.canton?.provincia?.pais?.codigoIso || '',
                idProvincia: tipoJsoncogno.parroquia?.canton?.provincia?.idProvincia || 0,
                Provincia: tipoJsoncogno.parroquia?.canton?.provincia?.nombre || '',
                codigoAreaProvincia: tipoJsoncogno.parroquia?.canton?.provincia?.codigoArea || '',
                idCanton: tipoJsoncogno.parroquia?.canton?.idCanton || 0,
                Canton: tipoJsoncogno.parroquia?.canton?.nombre || '',
                idParroquia: tipoJsoncogno.parroquia?.idParroquia || 0,
                Parroquia: tipoJsoncogno.parroquia?.nombre || '',
                Tipo
            };

            if (existingRecord) {
                Object.assign(existingRecord, lugarData);
                await this.cognoSolicitudLugarNacimientoRepository.save(existingRecord);
                return existingRecord;
            } else {
                const newRecord = this.cognoSolicitudLugarNacimientoRepository.create(lugarData);
                await this.cognoSolicitudLugarNacimientoRepository.save(newRecord);
                return newRecord;
            }

        } catch (error) {
            this.handleDBException(error);
        }
    }


    async createNacionalidades(apiData: any, idCognoSolicitudCredito: number): Promise<void> {
        try {
            // Validación previa para evitar errores de undefined
            if (!apiData?.nacionalidades || !Array.isArray(apiData.nacionalidades) || apiData.nacionalidades.length === 0) {
                console.error("Error: apiData.nacionalidades es undefined o vacío.");
                throw new Error("Los datos de nacionalidad son inválidos o incompletos.");
            }

            for (const nacionalidad of apiData.nacionalidades) {
                if (!nacionalidad?.pais) {
                    console.error("Error: Una de las nacionalidades no tiene información del país.");
                    continue; // Saltar esta iteración si no tiene país
                }

                const { idPais, nombre, codigoArea, codigoIso2, codigoIso3, codigoIso } = nacionalidad.pais;

                // Verificar si ya existe un registro con la misma solicitud y país
                const existingRecord = await this.cognoSolicitudNacionalidadesRepository.findOne({
                    where: { idCognoSolicitudCredito, idPais },
                });

                if (existingRecord) {
                    // Si el registro existe, actualizamos los campos
                    existingRecord.idCognoSolicitudCredito = idCognoSolicitudCredito;
                    existingRecord.idPais = idPais;
                    existingRecord.nombre = nombre;

                    existingRecord.codigoArea = codigoArea;
                    existingRecord.codigoIso2 = codigoIso2;
                    existingRecord.codigoIso3 = codigoIso3;
                    existingRecord.codigoIso = codigoIso;

                    await this.cognoSolicitudNacionalidadesRepository.save(existingRecord);
                } else {
                    // Si el registro no existe, creamos uno nuevo
                    const createCognosolicitudnacionalidadesDto: CreateCognosolicitudnacionalidadesDto = {
                        idCognoSolicitudCredito,
                        idPais,
                        nombre,
                        codigoArea,
                        codigoIso2,
                        codigoIso3,
                        codigoIso,
                    };
                    const newRecord = this.cognoSolicitudNacionalidadesRepository.create(createCognosolicitudnacionalidadesDto);
                    await this.cognoSolicitudNacionalidadesRepository.save(newRecord);
                }
            }
        } catch (error) {
            console.error("Error en createNacionalidades:", error);
            this.handleDBException(error);
        }
    }

    async createProfesiones(apiData: any, idCognoSolicitudCredito: number): Promise<void> {


        try {
            if (!apiData?.profesiones || !Array.isArray(apiData.profesiones) || apiData.profesiones.length === 0) {
                console.error("Error: apiData.profesiones es undefined o vacío.");
                return; // Salir temprano si no hay profesiones
            }

            for (const profesionData of apiData.profesiones) {
                if (!profesionData?.profesion) {
                    console.error("Error: Una de las profesiones no tiene información.");
                    continue; // Saltar esta iteración si no tiene profesión
                }

                const idProfesion = profesionData.profesion.idProfesion;
                const descripcion = profesionData.profesion.descripcion; // Obtener la descripción

                // Verificar si ya existe un registro con la misma solicitud y profesión
                const existingRecord = await this.cognoSolicitudProfesionesRepository.findOne({
                    where: { idCognoSolicitudCredito, idProfesion },
                });

                if (existingRecord) {
                    existingRecord.idCognoSolicitudCredito = idCognoSolicitudCredito;
                    existingRecord.idProfesion = idProfesion;
                    existingRecord.descripcion = descripcion; // Actualizar la descripción
                    await this.cognoSolicitudProfesionesRepository.save(existingRecord);
                } else {
                    const createCognosolicitudprofesionesDto: CreateCognosolicitudprofesionesDto = {
                        idCognoSolicitudCredito,
                        idProfesion,
                        descripcion // Agregar descripción
                    };
                    const newRecord = this.cognoSolicitudProfesionesRepository.create(createCognosolicitudprofesionesDto);
                    await this.cognoSolicitudProfesionesRepository.save(newRecord);
                }
            }
        } catch (error) {
            console.error("Error en createProfesiones:", error);
            this.handleDBException(error);
        }
    }

    async createTrabajo(apiData: any, idCognoSolicitudCredito: number): Promise<void> {
        console.log('createTrabajo', apiData, idCognoSolicitudCredito);

        try {
            if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
                console.error("Error: No se encontraron trabajos válidos en la respuesta de la API.");
                return;
            }

            for (const trabajoData of apiData) {
                const pp = trabajoData.personaPatrono;
                const ti = pp?.tipoIdentificacion;
                const tc = pp?.tipoCompania;
                const oc = pp?.oficinaControl;
                const pr = oc?.provincia;
                const pa = pr?.pais;
                const sl = pp?.situacionLegal;

                const identificacionPatrono = pp?.identificacion ?? '';

                const existingRecord = await this.cognoTrabajoRepository.findOne({
                    where: {
                        idCognoSolicitudCredito: idCognoSolicitudCredito,
                        identificacionPersonaPatrono: identificacionPatrono,
                    },
                });

                if (existingRecord) {
                    existingRecord.idCognoSolicitudCredito = idCognoSolicitudCredito || 0;
                    existingRecord.fechaActualizacion = trabajoData.fechaActualizacion || 0;
                    existingRecord.fechaIngreso = trabajoData.fechaIngreso || 0;
                    existingRecord.fechaAfiliacionHasta = trabajoData.fechaAfiliacionHasta || new Date();

                    existingRecord.identificacionPersonaPatrono = pp?.identificacion ?? '';
                    existingRecord.nombrePatrono = pp?.nombre ?? '';
                    existingRecord.nombreUno = pp?.nombreUno ?? '';
                    existingRecord.nombreDos = pp?.nombreDos ?? '';
                    existingRecord.idTipoIdentificacion = ti?.idTipoIdentificacion ?? 0;
                    existingRecord.descripcion = ti?.descripcion ?? '';
                    existingRecord.plazoSocial = pp?.plazoSocial ?? new Date();
                    existingRecord.expediente = pp?.expediente ?? 0;
                    existingRecord.fechaConstitucion = pp?.fechaConstitucion ? new Date(pp.fechaConstitucion) : null;
                    existingRecord.nombreComercial = pp?.nombreComercial ?? '';
                    existingRecord.idTipoCompania = tc?.idTipoCompania ?? 0;
                    existingRecord.nombretipoCompania = tc?.nombre ?? '';
                    existingRecord.idCanton = oc?.idCanton ?? 0;
                    existingRecord.nombreCanton = oc?.nombre ?? '';
                    existingRecord.idProvincia = pr?.idProvincia ?? 0;
                    existingRecord.nombreProvincia = pr?.nombre ?? '';
                    existingRecord.codigoArea = pr?.codigoArea ?? '';
                    existingRecord.idPais = pa?.idPais ?? 0;
                    existingRecord.nombrePais = pa?.nombre ?? '';
                    existingRecord.codigoAreaPais = pa?.codigoArea ?? '';
                    existingRecord.codigoIso2 = pa?.codigoIso2 ?? '';
                    existingRecord.codigoIso3 = pa?.codigoIso3 ?? '';
                    existingRecord.codigoIso = pa?.codigoIso ?? '';
                    existingRecord.nombreSituacionLegal = sl?.nombre ?? '';
                    existingRecord.proveedoraEstado = pp?.proveedoraEstado ?? '';
                    existingRecord.pagoRemesas = pp?.pagoRemesas ?? '';
                    existingRecord.vendeCredito = pp?.vendeCredito ?? '';
                    existingRecord.capitalSuscrito = pp?.capitalSuscrito ?? 0;
                    existingRecord.capitalAutorizado = pp?.capitalAutorizado ?? 0;
                    existingRecord.valorNominal = pp?.valorNominal ?? 0;
                    existingRecord.perteneceMv = pp?.perteneceMv ?? '';
                    existingRecord.apellidoUno = pp?.apellidoUno ?? '';
                    existingRecord.apellidoDos = pp?.apellidoDos ?? '';

                    existingRecord.valor = trabajoData.personaIngreso?.valor ?? 0;
                    existingRecord.tipoIngreso = trabajoData.personaIngreso?.tipoIngreso?.nombre ?? '';
                    existingRecord.frecuenciaIngreso = trabajoData.personaIngreso?.frecuenciaIngreso?.descripcion ?? '';

                    existingRecord.valorRango = trabajoData.personaIngreso?.valorRango ?? '';

                    existingRecord.idCargo = trabajoData.cargo?.idCargo ?? 0;
                    existingRecord.nombreCargo = trabajoData.cargo?.nombre ?? '';

                    existingRecord.tipoAfiliado = trabajoData.tipoAfiliado ?? '';
                    existingRecord.telefonoOfi = trabajoData.telefonoOfi ?? '';
                    existingRecord.telefonoAfi = trabajoData.telefonoAfi ?? '';
                    existingRecord.direccionOfi = trabajoData.direccionOfi ?? '';
                    existingRecord.direccionAfi = trabajoData.direccionAfi ?? '';
                    existingRecord.celular = trabajoData.celular ?? '';
                    existingRecord.baseDate = trabajoData.baseDate ?? new Date().toISOString();

                    await this.cognoTrabajoRepository.save(existingRecord);
                } else {
                    const createCognoTrabajoDto: CreateCognoTrabajoDto = {
                        idCognoSolicitudCredito: idCognoSolicitudCredito || 0,
                        fechaActualizacion: trabajoData.fechaActualizacion || 0,
                        fechaIngreso: trabajoData.fechaIngreso || 0,
                        fechaAfiliacionHasta: trabajoData.fechaAfiliacionHasta || 0,

                        identificacionPersonaPatrono: pp?.identificacion ?? '',
                        nombrePatrono: pp?.nombre ?? '',
                        nombreUno: pp?.nombreUno ?? '',
                        nombreDos: pp?.nombreDos ?? '',
                        idTipoIdentificacion: ti?.idTipoIdentificacion ?? 0,
                        descripcion: ti?.descripcion ?? '',
                        plazoSocial: pp?.plazoSocial ?? new Date(),
                        expediente: pp?.expediente ?? 0,
                        fechaConstitucion: pp?.fechaConstitucion ? new Date(pp.fechaConstitucion) : null,
                        nombreComercial: pp?.nombreComercial ?? '',
                        idTipoCompania: tc?.idTipoCompania ?? 0,
                        nombretipoCompania: tc?.nombre ?? '',
                        idCanton: oc?.idCanton ?? 0,
                        nombreCanton: oc?.nombre ?? '',
                        idProvincia: pr?.idProvincia ?? 0,
                        nombreProvincia: pr?.nombre ?? '',
                        codigoArea: pr?.codigoArea ?? '',
                        idPais: pa?.idPais ?? 0,
                        nombrePais: pa?.nombre ?? '',
                        codigoAreaPais: pa?.codigoArea ?? '',
                        codigoIso2: pa?.codigoIso2 ?? '',
                        codigoIso3: pa?.codigoIso3 ?? '',
                        codigoIso: pa?.codigoIso ?? '',
                        nombreSituacionLegal: sl?.nombre ?? '',
                        proveedoraEstado: pp?.proveedoraEstado ?? '',
                        pagoRemesas: pp?.pagoRemesas ?? '',
                        vendeCredito: pp?.vendeCredito ?? '',
                        capitalSuscrito: pp?.capitalSuscrito ?? 0,
                        capitalAutorizado: pp?.capitalAutorizado ?? 0,
                        valorNominal: pp?.valorNominal ?? 0,
                        perteneceMv: pp?.perteneceMv ?? '',
                        apellidoUno: pp?.apellidoUno ?? '',
                        apellidoDos: pp?.apellidoDos ?? '',

                        valor: trabajoData.personaIngreso?.valor ?? 0,
                        tipoIngreso: trabajoData.personaIngreso?.tipoIngreso?.nombre ?? '',
                        frecuenciaIngreso: trabajoData.personaIngreso?.frecuenciaIngreso?.descripcion ?? '',

                        valorRango: trabajoData.personaIngreso?.valorRango ?? '',
                        idCargo: trabajoData.cargo?.idCargo ?? 0,
                        nombreCargo: trabajoData.cargo?.nombre ?? '',
                        tipoAfiliado: trabajoData.tipoAfiliado ?? '',
                        telefonoOfi: trabajoData.telefonoOfi ?? '',
                        telefonoAfi: trabajoData.telefonoAfi ?? '',
                        direccionOfi: trabajoData.direccionOfi ?? '',
                        direccionAfi: trabajoData.direccionAfi ?? '',
                        celular: trabajoData.celular ?? '',
                        baseDate: trabajoData.baseDate ?? new Date().toISOString(),
                    };

                    const newRecord = this.cognoTrabajoRepository.create(createCognoTrabajoDto);
                    await this.cognoTrabajoRepository.save(newRecord);
                }
            }
        } catch (error) {
            console.error("Error en createTrabajo:", error);
            this.handleDBException(error);
        }
    }

    async createTrabajoLite(apiData: any[], idCognoSolicitudCredito: number): Promise<void> {
        console.log('createTrabajoLite', apiData, idCognoSolicitudCredito);

        if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
            console.warn("No hay trabajos válidos para registrar.");
            return;
        }

        try {
            for (const trabajo of apiData) {
                const patrono = trabajo.personaPatrono || {};
                const identificacionPatrono = patrono.identificacion ?? '';
                const ti = patrono.tipoIdentificacion || {};
                const tc = patrono.tipoCompania || {};
                const oc = patrono.oficinaControl || {};
                const pr = oc.provincia || {};
                const pa = pr.pais || {};
                const sl = patrono.situacionLegal || {};

                const fechaConstitucion = patrono.fechaConstitucion && !isNaN(patrono.fechaConstitucion)
                    ? new Date(patrono.fechaConstitucion)
                    : null;

                const createDto: CreateCognoTrabajoDto = {
                    idCognoSolicitudCredito,

                    fechaActualizacion: trabajo.fechaActualizacion ?? 0,
                    fechaIngreso: trabajo.fechaIngreso ?? 0,
                    fechaAfiliacionHasta: trabajo.fechaAfiliacionHasta ?? 0,

                    identificacionPersonaPatrono: identificacionPatrono,
                    nombrePatrono: patrono.nombre ?? '',
                    nombreUno: patrono.nombreUno ?? '',
                    nombreDos: patrono.nombreDos ?? '',
                    idTipoIdentificacion: ti.idTipoIdentificacion ?? 0,
                    descripcion: ti.descripcion ?? '',
                    plazoSocial: patrono.plazoSocial ?? new Date(),
                    expediente: patrono.expediente ?? 0,
                    fechaConstitucion: fechaConstitucion,
                    nombreComercial: patrono.nombreComercial ?? '',
                    idTipoCompania: tc.idTipoCompania ?? 0,
                    nombretipoCompania: tc.nombre ?? '',
                    idCanton: oc.idCanton ?? 0,
                    nombreCanton: oc.nombre ?? '',
                    idProvincia: pr.idProvincia ?? 0,
                    nombreProvincia: pr.nombre ?? '',
                    codigoArea: pr.codigoArea ?? '',
                    idPais: pa.idPais ?? 0,
                    nombrePais: pa.nombre ?? '',
                    codigoAreaPais: pa.codigoArea ?? '',
                    codigoIso2: pa.codigoIso2 ?? '',
                    codigoIso3: pa.codigoIso3 ?? '',
                    codigoIso: pa.codigoIso ?? 0,
                    nombreSituacionLegal: sl.nombre ?? '',
                    proveedoraEstado: patrono.proveedoraEstado ?? '',
                    pagoRemesas: patrono.pagoRemesas ?? '',
                    vendeCredito: patrono.vendeCredito ?? '',
                    capitalSuscrito: patrono.capitalSuscrito ?? 0,
                    capitalAutorizado: patrono.capitalAutorizado ?? 0,
                    valorNominal: patrono.valorNominal ?? 0,
                    perteneceMv: patrono.perteneceMv ?? '',
                    apellidoUno: patrono.apellidoUno ?? '',
                    apellidoDos: patrono.apellidoDos ?? '',

                    valor: trabajo.personaIngreso?.valor ?? 0,
                    tipoIngreso: trabajo.personaIngreso?.tipoIngreso?.nombre ?? '',
                    frecuenciaIngreso: trabajo.personaIngreso?.frecuenciaIngreso?.descripcion ?? '',
                    valorRango: trabajo.personaIngreso?.valorRango ?? '',

                    idCargo: trabajo.cargo?.idCargo ?? 0,
                    nombreCargo: trabajo.cargo?.nombre ?? '',

                    tipoAfiliado: trabajo.tipoAfiliado?.nombre ?? '',
                    telefonoOfi: trabajo.telefonoOfi ?? '',
                    telefonoAfi: trabajo.telefonoAfi ?? '',
                    direccionOfi: trabajo.direccionOfi ?? '',
                    direccionAfi: trabajo.direccionAfi ?? '',
                    celular: trabajo.celular ?? '',
                    baseDate: trabajo.baseDate ?? new Date().toISOString(),
                };

                const newRecord = this.cognoTrabajoRepository.create(createDto);
                await this.cognoTrabajoRepository.save(newRecord);
            }
        } catch (error) {
            console.error("Error en createTrabajoLite:", error);
            this.handleDBException?.(error);
        }
    }


    async saveCognoAfiliacionIess(afiliacion: AfiliacionIessDto, idCognoSolicitudCredito: number): Promise<void> {
        try {
            console.log('📥 Afiliación recibida:', JSON.stringify(afiliacion, null, 2));

            if (!afiliacion.cedula || !afiliacion.empresas) {
                throw new Error('Datos incompletos en la afiliación');
            }

            const afiliacionEntity = this.cognoAfiliacionIessRepository.create({
                cedula: afiliacion.cedula,
                nombre: afiliacion.nombre,
                corte: afiliacion.corte,
                estado: afiliacion.estado,
                idCognoSolicitudCredito,
            });

            const savedAfiliacion = await this.cognoAfiliacionIessRepository.save(afiliacionEntity);

            if (Array.isArray(afiliacion.empresas) && afiliacion.empresas.length > 0) {
                const empresasEntities = afiliacion.empresas.map((empresa) =>
                    this.cognoAfiliacionIessEmpresaRepository.create({
                        idCognoAfiliacionIess: savedAfiliacion.idCognoAfiliacionIess,
                        nombreEmpresa: empresa.nombreEmpresa,
                        ruc: empresa.ruc,
                    }),
                );

                await this.cognoAfiliacionIessEmpresaRepository.save(empresasEntities);
            }

            this.logger.log(`✅ Afiliación IESS guardada para solicitud ${idCognoSolicitudCredito}`);
        } catch (error) {
            this.logger.error(`❌ Error al guardar afiliación IESS: ${error.message}`);
            throw new InternalServerErrorException('Error al guardar afiliación IESS');
        }
    }

    async guardarDeudaEmovConInfracciones(
        deudaData: DeudaEmovDto,
        idCognoSolicitudCredito: number
    ): Promise<void> {
        try {
            this.logger.log('💾 Guardando deuda EMOV para:', deudaData);
            console.log('deudaData', JSON.stringify(deudaData, null, 2));
            // 1. Guardar deuda principal
            const deuda = this.cognoDeudaEmovRepository.create({
                idCognoSolicitudCredito,
                cedula: deudaData.cedula,
                tipo_busqueda: deudaData.tipoBusqueda,
                valor_adeudado: deudaData.valorAdeudado,
                fecha_actualizacion: deudaData.fechaActualizacion,
            });

            const deudaSaved = await this.cognoDeudaEmovRepository.save(deuda);

            // 2. Recorrer infracciones
            for (const infraccionDto of deudaData.infraccion) {
                const infraccion = this.cognoInfraccionRepository.create({
                    rubro: infraccionDto.rubro,
                    detalle: infraccionDto.detalle,
                    total: infraccionDto.total,
                    idDeudaEmov: deudaSaved.idDeudaEmov,
                });

                const infraccionSaved = await this.cognoInfraccionRepository.save(infraccion);
                const dr = infraccionDto.detalleRubro;
                console.log('lugar length:', dr.lugar?.length);
                console.log('articulo length:', dr.articulo?.length);
                // etc para observaciones, placa, etc

                // 🔍 Validar que detalleRubro sea objeto y no array
                const detalleRubroData = Array.isArray(infraccionDto.detalleRubro)
                    ? infraccionDto.detalleRubro[0] // o recorrerlos todos si esperas múltiples
                    : infraccionDto.detalleRubro;

                if (!detalleRubroData || typeof detalleRubroData !== 'object') {
                    this.logger.warn(`⚠️ detalleRubro inválido para infracción: ${infraccionDto.detalle}`);
                    continue;
                }

                const detalle = this.cognoDetalleRubroRepository.create({
                    ...detalleRubroData,
                    id_infraccion: infraccionSaved.id_infraccion,
                });

                await this.cognoDetalleRubroRepository.save(detalle);
            }

            this.logger.log(`✅ Datos de deuda EMOV guardados para cédula ${deudaData.cedula}`);
        } catch (error) {
            this.logger.error(`❌ Error al guardar deuda EMOV: ${error.message}`);
            throw new InternalServerErrorException('Error al guardar datos de deuda EMOV');
        }
    }

    async saveCognoIssfacCertMedico(apiData: AfiliacionesDto, idCognoSolicitudCredito: number): Promise<void> {
        try {
            console.log('saveCognoIssfacCertMedico', JSON.stringify(apiData, null, 2));
            if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
                console.warn('⚠️ No se encontraron datos de afiliaciones válidos');
                return;
            }

            for (const afiliacion of apiData) {
                const {
                    cedula,
                    nombre,
                    edad,
                    categoria,
                    cobertura,
                    fechaActualizacion
                } = afiliacion;

                // Convertir la fecha a tipo Date (formato: dd/mm/yyyy -> yyyy-mm-dd)
                const fechaActualizacionDate = fechaActualizacion
                    ? new Date(fechaActualizacion.split('/').reverse().join('-'))
                    : null;

                const cert = this.cognoIssfacCertMedicoRepository.create({
                    idCognoSolicitudCredito,
                    cedula,
                    nombre,
                    edad,
                    categoria,
                    cobertura,
                    fechaActualizacion: fechaActualizacionDate
                });

                await this.cognoIssfacCertMedicoRepository.save(cert);
            }

            console.log(`✅ Certificados médicos guardados correctamente para solicitud ${idCognoSolicitudCredito}`);
        } catch (error) {
            console.error('❌ Error al guardar certificados médicos:', error);
            throw error;
        }
    }

    private handleDBException(error: any) {
        if (error.code === '23505') {
            throw new BadRequestException(error.detail);
        }
        if (error.code === '20648') {
            throw new BadRequestException(error.detail);
        }
        if (error.code === '28088') {
            throw new BadRequestException(error.detail);
        }
        if (error.code === '13144') {
            throw new BadRequestException(error.detail);
        }
        if (error.code === '26652') {
            throw new BadRequestException(error.detail);
        }
        if (error.code === '12684') {
            throw new BadRequestException(error.detail);
        }
        if (error.code === '7956') {
            throw new BadRequestException(error.detail);
        }
        this.logger.error(error);
        throw new InternalServerErrorException('Unexpected error');

    }
}
