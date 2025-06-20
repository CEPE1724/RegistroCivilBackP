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
import { CreateCognolugarnacimientoDto } from '../dto/create-cognolugarnacimiento.dto';
import { UpdateCognosolicitudcreditoDto } from '../dto/update-cognosolicitudcredito.dto';
import { CreateCognosolicitudnacionalidadesDto } from '../dto/create-cognosolicitudnacionalidades.dto';
import { Cognosolicitudcredito } from '../entities/cognosolicitudcredito.entity';
import { CognoPersonaNatural } from '../entities/cognopersonanatural.entity';
import { CognoSolicitudNacionalidades } from '../entities/cognosolicitudnacionalidades.entity';
import { CreateCognosolicitudprofesionesDto } from '../dto/create-cognosolicitudprofesiones.dto';
import { CognoSolicitudLugarNacimiento } from '../entities/cognosolicitudlugarnacimiento.entity';
import { CognoSolicitudProfesiones } from '../entities/cognosolicitudprofesiones.entity';
import { CognoTrabajo } from '../entities/cognotrabajo.entity';
import { CreateCognoTrabajoDto } from '../dto/create-cognotrabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
@Injectable()
export class AuthService {
    private readonly logger = new Logger('AuthServiceCogno');
    private readonly keycloakUrl = process.env.KEYCLOAK_URL;
    private readonly clientId = process.env.KEYCLOAK_CLIENT_ID;
    private readonly username = process.env.KEYCLOAK_USERNAME;
    private readonly password = process.env.KEYCLOAK_PASSWORD;
    private readonly apiUrl = 'http://app.cognoconsultas.com/consultas/pn_inf_basica/'; // API externa
    private readonly apiUrl2 = 'http://app.cognoconsultas.com/consultas/pn_trabajos/'; // API externa
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
            const url = `${this.apiUrl}${cedula}`;

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
            const url = `${this.apiUrl}${cedula}`;  // Concatenamos la cédula en la URL

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
            const url = `${this.apiUrl2}${cedula}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            console.log('Response from API Trabajo:', data.trabajos);

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

                existingRecord.idNivelEducacion = apiData.nivelEducacion.nivelEducacion.idNivelEducacion;
                existingRecord.NivelEducacion = apiData.nivelEducacion.nivelEducacion.descripcion;
                existingRecord.nivel = apiData.nivelEducacion.nivelEducacion.nivel;

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
                    idNivelEducacion: apiData.nivelEducacion.nivelEducacion.idNivelEducacion,
                    NivelEducacion: apiData.nivelEducacion.nivelEducacion.descripcion,
                    nivel: apiData.nivelEducacion.nivelEducacion.nivel,
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
                throw new Error("Los datos de profesiones son inválidos o incompletos.");
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
                throw new Error("La información laboral es obligatoria y no se obtuvo desde la API.");
            }

            for (const trabajoData of apiData) {

                const identificacionPatrono = trabajoData.personaPatrono?.identificacion ?? '';

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

                    if (trabajoData.personaPatrono) {

                        // Validar que personaPatrono exista
                        existingRecord.identificacionPersonaPatrono = trabajoData.personaPatrono.identificacion || '';
                        existingRecord.nombrePatrono = trabajoData.personaPatrono.nombre || '';
                        existingRecord.nombreUno = trabajoData.personaPatrono.nombreUno || '';
                        existingRecord.nombreDos = trabajoData.personaPatrono.nombreDos || '';
                        existingRecord.idTipoIdentificacion = trabajoData.personaPatrono.tipoIdentificacion.idTipoIdentificacion || 0;
                        existingRecord.descripcion = trabajoData.personaPatrono.tipoIdentificacion.descripcion || '';
                        existingRecord.plazoSocial = trabajoData.personaPatrono.plazoSocial || new Date();
                        existingRecord.expediente = trabajoData.personaPatrono.expediente || 0;
                        existingRecord.fechaConstitucion = trabajoData.personaPatrono.fechaConstitucion || new Date();
                        existingRecord.nombreComercial = trabajoData.personaPatrono.nombreComercial || '';
                        existingRecord.idTipoCompania = trabajoData.personaPatrono.tipoCompania.idTipoCompania || 0;
                        existingRecord.nombretipoCompania = trabajoData.personaPatrono.tipoCompania.nombre || '';
                        existingRecord.idCanton = trabajoData.personaPatrono.oficinaControl.idCanton || 0;
                        existingRecord.nombreCanton = trabajoData.personaPatrono.oficinaControl.nombre || '';
                        existingRecord.idProvincia = trabajoData.personaPatrono.oficinaControl.provincia.idProvincia || 0;
                        existingRecord.nombreProvincia = trabajoData.personaPatrono.oficinaControl.provincia.nombre || '';
                        existingRecord.codigoArea = trabajoData.personaPatrono.oficinaControl.provincia.codigoArea || '';
                        existingRecord.idPais = trabajoData.personaPatrono.oficinaControl.provincia.pais.idPais || 0;
                        existingRecord.nombrePais = trabajoData.personaPatrono.oficinaControl.provincia.pais.nombre || '';
                        existingRecord.codigoAreaPais = trabajoData.personaPatrono.oficinaControl.provincia.pais.codigoArea || '';
                        existingRecord.codigoIso2 = trabajoData.personaPatrono.oficinaControl.provincia.pais.codigoIso2 || '';
                        existingRecord.codigoIso3 = trabajoData.personaPatrono.oficinaControl.provincia.pais.codigoIso3 || '';
                        existingRecord.codigoIso = trabajoData.personaPatrono.oficinaControl.provincia.pais.codigoIso || '';
                        existingRecord.nombreSituacionLegal = trabajoData.personaPatrono.situacionLegal.nombre || '';
                        existingRecord.proveedoraEstado = trabajoData.personaPatrono.proveedoraEstado || '';
                        existingRecord.pagoRemesas = trabajoData.personaPatrono.pagoRemesas || '';
                        existingRecord.vendeCredito = trabajoData.personaPatrono.vendeCredito || '';
                        existingRecord.capitalSuscrito = trabajoData.personaPatrono.capitalSuscrito || 0;
                        existingRecord.capitalAutorizado = trabajoData.personaPatrono.capitalAutorizado || 0;
                        existingRecord.valorNominal = trabajoData.personaPatrono.valorNominal || 0;
                        existingRecord.perteneceMv = trabajoData.personaPatrono.perteneceMv || '';
                        existingRecord.apellidoUno = trabajoData.personaPatrono.apellidoUno || '';
                        existingRecord.apellidoDos = trabajoData.personaPatrono.apellidoDos || '';
                    }

                    existingRecord.valor = trabajoData.personaIngreso.valor || 0;
                    existingRecord.tipoIngreso = trabajoData.personaIngreso.tipoIngreso || '';
                    existingRecord.frecuenciaIngreso = trabajoData.personaIngreso.frecuenciaIngreso || '';
                    existingRecord.valorRango = trabajoData.personaIngreso.valorRango || '';

                    existingRecord.idCargo = (trabajoData.cargo && trabajoData.cargo.idCargo !== null) ? trabajoData.cargo.idCargo : 0;
                    existingRecord.nombreCargo = (trabajoData.cargo && trabajoData.cargo.nombre) || '';

                    existingRecord.tipoAfiliado = trabajoData.tipoAfiliado || '';
                    existingRecord.telefonoOfi = trabajoData.telefonoOfi || '';
                    existingRecord.telefonoAfi = trabajoData.telefonoAfi || '';
                    existingRecord.direccionOfi = trabajoData.direccionOfi || '';
                    existingRecord.direccionAfi = trabajoData.direccionAfi || '';
                    existingRecord.celular = trabajoData.celular || '';
                    existingRecord.baseDate = trabajoData.baseDate || new Date().toISOString();
                } else {

                    console.log('No existe el registro, se creará uno nuevo.');
                    console.log('idCognoSolicitudCredito:', idCognoSolicitudCredito);
                    console.log('trabajoData:', trabajoData);
                    const pp = trabajoData.personaPatrono;
                    const ti = pp?.tipoIdentificacion;
                    const tc = pp?.tipoCompania;
                    const oc = pp?.oficinaControl;
                    const pr = oc?.provincia;
                    const pa = pr?.pais;
                    const sl = pp?.situacionLegal;

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
                        fechaConstitucion: pp?.fechaConstitucion ?? new Date(),
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
                        tipoIngreso: trabajoData.personaIngreso?.tipoIngreso ?? '',
                        frecuenciaIngreso: trabajoData.personaIngreso?.frecuenciaIngreso ?? '',
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
