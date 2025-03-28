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
            // Pasamos la cédula como parte de las credenciales si es necesario
            const data = qs.stringify({
                username: this.username,  // Puedes usar la cédula como username si corresponde
                password: this.password,
                client_id: this.clientId,
                grant_type: 'password',
            });
       

            // Solicitud para obtener el token
            const response = await axios.post(this.keycloakUrl, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
          

            if (response.data && response.data.access_token) {
                return response.data.access_token;  // Retornamos el token
            }

            throw new InternalServerErrorException('Error al obtener el token');
        } catch (error) {
            this.handleDBException(error);
        }
    }

    // Método para consumir la API externa usando el token y la cédula como parámetro en la URL
    async getApiData(token: string, cedula: string): Promise<any> {

     
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

    async getApiDataTrabajo(token: string, cedula: string): Promise<any> {
        try {
            // Realizamos la solicitud a la API externa usando el token
            const url = `${this.apiUrl2}${cedula}`;  // Concatenamos la cédula en la URL

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

            
            /// veirificar si existe la persona natural
            const existingRecord = await this.cognoPersonaNaturalRepository.findOne({
                where: { idCognoSolicitudCredito: idCognoSolicitudCredito, Tipo: Tipo },
            });

            /* titutlar*/
            if (existingRecord) {
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
                existingRecord.lugarDefuncion = apiData.personaNaturalConyuge.personaConyuge.lugarDefuncion;
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
                    lugarDefuncion: apiData.personaNaturalConyuge.personaConyuge.lugarDefuncion,
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
                return newRecord;
            }
        } catch (error) {
            this.handleDBException(error);
        }
    }

    async createLugarNacimiento(apiData: any, idCognoSolicitudCredito: number, Tipo: number): Promise<CognoSolicitudLugarNacimiento> {
        try {
            //console.log('apiData', apiData);
            /// veirificar si existe la persona natural
            const existingRecord = await this.cognoSolicitudLugarNacimientoRepository.findOne({
                where: { idCognoSolicitudCredito: idCognoSolicitudCredito, Tipo: Tipo },
            });
            // apiData.personaNatural   titular
            // apiData.personaNaturalConyuge.personaConyuge  conyuge

            let tipoJsoncogno = apiData.personaNatural.lugarNacimiento;

            if (Tipo == 1) {
                tipoJsoncogno = apiData.personaNaturalConyuge.personaConyuge.lugarNacimiento;
            }
            if (Tipo == 2) {
                tipoJsoncogno = apiData.personaNaturalConyuge.lugar;
            }
            /* titutlar*/
            if (existingRecord) {

                // ller parroquia len
                // Actualizamos los datos si ya existe
                existingRecord.idCognoSolicitudCredito = idCognoSolicitudCredito;
                existingRecord.idLugar = tipoJsoncogno.idLugar || 0;
                existingRecord.codigoPostal = tipoJsoncogno.codigoPostal;
                existingRecord.fechaActualizacion = tipoJsoncogno.fechaActualizacion || null;
                existingRecord.idPais = tipoJsoncogno.parroquia.canton.provincia.pais.idPais;
                existingRecord.Pais = tipoJsoncogno.parroquia.canton.provincia.pais.nombre;
                existingRecord.codigoAreaPais = tipoJsoncogno.parroquia.canton.provincia.pais.codigoArea;
                existingRecord.codigoIso2 = tipoJsoncogno.parroquia.canton.provincia.pais.codigoIso2;
                existingRecord.codigoIso3 = tipoJsoncogno.parroquia.canton.provincia.pais.codigoIso3;
                existingRecord.codigoIso = tipoJsoncogno.parroquia.canton.provincia.pais.codigoIso;
                existingRecord.idProvincia = tipoJsoncogno.parroquia.canton.provincia.idProvincia;
                existingRecord.Provincia = tipoJsoncogno.parroquia.canton.provincia.nombre;
                existingRecord.codigoAreaProvincia = tipoJsoncogno.parroquia.canton.provincia.codigoArea;
                existingRecord.idCanton = tipoJsoncogno.parroquia.canton.idCanton;
                existingRecord.Canton = tipoJsoncogno.parroquia.canton.nombre;
                existingRecord.idParroquia = tipoJsoncogno.parroquia.idParroquia;
                existingRecord.Parroquia = tipoJsoncogno.parroquia.nombre;
                existingRecord.Tipo = Tipo;

                //// tipo establesco como 0 

                await this.cognoSolicitudLugarNacimientoRepository.save(existingRecord);
                return existingRecord;
            }
            else {
             
                const createCognolugarNacimientoDto: CreateCognolugarnacimientoDto = {
                    idCognoSolicitudCredito: idCognoSolicitudCredito,
                    idLugar: tipoJsoncogno.idLugar || 0,
                    codigoPostal: tipoJsoncogno.codigoPostal,
                    fechaActualizacion: tipoJsoncogno.fechaActualizacion || null,
                    idPais: tipoJsoncogno.parroquia.canton.provincia.pais.idPais,
                    Pais: tipoJsoncogno.parroquia.canton.provincia.pais.nombre,
                    codigoAreaPais: tipoJsoncogno.parroquia.canton.provincia.pais.codigoArea,
                    codigoIso2: tipoJsoncogno.parroquia.canton.provincia.pais.codigoIso2,
                    codigoIso3: tipoJsoncogno.parroquia.canton.provincia.pais.codigoIso3,
                    codigoIso: tipoJsoncogno.parroquia.canton.provincia.pais.codigoIso,
                    idProvincia: tipoJsoncogno.parroquia.canton.provincia.idProvincia,
                    Provincia: tipoJsoncogno.parroquia.canton.provincia.nombre,
                    codigoAreaProvincia: tipoJsoncogno.parroquia.canton.provincia.codigoArea,
                    idCanton: tipoJsoncogno.parroquia.canton.idCanton,
                    Canton: tipoJsoncogno.parroquia.canton.nombre,
                    idParroquia: tipoJsoncogno.parroquia.idParroquia,
                    Parroquia: tipoJsoncogno.parroquia.nombre,
                    Tipo: Tipo,
                }
                const newRecord = this.cognoSolicitudLugarNacimientoRepository.create(createCognolugarNacimientoDto);
                await this.cognoSolicitudLugarNacimientoRepository.save(newRecord);
                return newRecord;
            }

        }
        catch (error) {
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
       console.log('apiDataentra aqui', apiData);

        try {
            if (!apiData?.trabajos || !Array.isArray(apiData.trabajos) || apiData.trabajos.length === 0) {
                console.error("Error: apiData.trabajos es undefined o vacío.");
                throw new Error("Los datos de trabajo son inválidos o incompletos.");
            }

            for (const trabajoData of apiData.trabajos) {

                const existingRecord = await this.cognoTrabajoRepository.findOne({
                    where: { idCognoSolicitudCredito: idCognoSolicitudCredito, identificacionPersonaPatrono: trabajoData.personaPatrono.identificacion },
                });
                console.log('trabajoData', existingRecord);
                if (existingRecord) {
                    console.log('si existe aqui', trabajoData);
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
                    console.log('entra aqui', trabajoData);
                    const createCognoTrabajoDto: CreateCognoTrabajoDto = {
                        idCognoSolicitudCredito: idCognoSolicitudCredito || 0,
                        fechaActualizacion: trabajoData.fechaActualizacion || 0,
                        fechaIngreso: trabajoData.fechaIngreso || 0,
                        fechaAfiliacionHasta: trabajoData.fechaAfiliacionHasta || new Date(),
                        
                        // Validar si existe personaPatrono
                        identificacionPersonaPatrono: trabajoData.personaPatrono ? trabajoData.personaPatrono.identificacion || '' : '',
                        nombrePatrono: trabajoData.personaPatrono ? trabajoData.personaPatrono.nombre || '' : '',
                        nombreUno: trabajoData.personaPatrono ? trabajoData.personaPatrono.nombreUno || '' : '',
                        nombreDos: trabajoData.personaPatrono ? trabajoData.personaPatrono.nombreDos || '' : '',
                        idTipoIdentificacion: trabajoData.personaPatrono ? trabajoData.personaPatrono.tipoIdentificacion.idTipoIdentificacion || 0 : 0,
                        descripcion: trabajoData.personaPatrono ? trabajoData.personaPatrono.tipoIdentificacion.descripcion || '' : '',
                        plazoSocial: trabajoData.personaPatrono ? trabajoData.personaPatrono.plazoSocial || new Date() : new Date(),
                        expediente: trabajoData.personaPatrono ? trabajoData.personaPatrono.expediente || 0 : 0,
                        fechaConstitucion: trabajoData.personaPatrono ? trabajoData.personaPatrono.fechaConstitucion || new Date() : new Date(),
                        nombreComercial: trabajoData.personaPatrono ? trabajoData.personaPatrono.nombreComercial || '' : '',
                        idTipoCompania: trabajoData.personaPatrono ? trabajoData.personaPatrono.tipoCompania.idTipoCompania || 0 : 0,
                        nombretipoCompania: trabajoData.personaPatrono ? trabajoData.personaPatrono.tipoCompania.nombre || '' : '',
                        idCanton: trabajoData.personaPatrono ? trabajoData.personaPatrono.oficinaControl.idCanton || 0 : 0,
                        nombreCanton: trabajoData.personaPatrono ? trabajoData.personaPatrono.oficinaControl.nombre || '' : '',
                        idProvincia: trabajoData.personaPatrono ? trabajoData.personaPatrono.oficinaControl.provincia.idProvincia || 0 : 0,
                        nombreProvincia: trabajoData.personaPatrono ? trabajoData.personaPatrono.oficinaControl.provincia.nombre || '' : '',
                        codigoArea: trabajoData.personaPatrono ? trabajoData.personaPatrono.oficinaControl.provincia.codigoArea || '' : '',
                        idPais: trabajoData.personaPatrono ? trabajoData.personaPatrono.oficinaControl.provincia.pais.idPais || 0 : 0,
                        nombrePais: trabajoData.personaPatrono ? trabajoData.personaPatrono.oficinaControl.provincia.pais.nombre || '' : '',
                        codigoAreaPais: trabajoData.personaPatrono ? trabajoData.personaPatrono.oficinaControl.provincia.pais.codigoArea || '' : '',
                        codigoIso2: trabajoData.personaPatrono ? trabajoData.personaPatrono.oficinaControl.provincia.pais.codigoIso2 || '' : '',
                        codigoIso3: trabajoData.personaPatrono ? trabajoData.personaPatrono.oficinaControl.provincia.pais.codigoIso3 || '' : '',
                        codigoIso: trabajoData.personaPatrono ? trabajoData.personaPatrono.oficinaControl.provincia.pais.codigoIso || '' : '',
                        nombreSituacionLegal: trabajoData.personaPatrono ? trabajoData.personaPatrono.situacionLegal.nombre || '' : '',
                        proveedoraEstado: trabajoData.personaPatrono ? trabajoData.personaPatrono.proveedoraEstado || '' : '',
                        pagoRemesas: trabajoData.personaPatrono ? trabajoData.personaPatrono.pagoRemesas || '' : '',
                        vendeCredito: trabajoData.personaPatrono ? trabajoData.personaPatrono.vendeCredito || '' : '',
                        capitalSuscrito: trabajoData.personaPatrono ? trabajoData.personaPatrono.capitalSuscrito || 0 : 0,
                        capitalAutorizado: trabajoData.personaPatrono ? trabajoData.personaPatrono.capitalAutorizado || 0 : 0,
                        valorNominal: trabajoData.personaPatrono ? trabajoData.personaPatrono.valorNominal || 0 : 0,
                        perteneceMv: trabajoData.personaPatrono ? trabajoData.personaPatrono.perteneceMv || '' : '',
                        apellidoUno: trabajoData.personaPatrono ? trabajoData.personaPatrono.apellidoUno || '' : '',
                        apellidoDos: trabajoData.personaPatrono ? trabajoData.personaPatrono.apellidoDos || '' : '',
                        
                        valor: trabajoData.personaIngreso.valor || 0,
                        tipoIngreso: trabajoData.personaIngreso.tipoIngreso || '',
                        frecuenciaIngreso: trabajoData.personaIngreso.frecuenciaIngreso || '',
                        valorRango: trabajoData.personaIngreso.valorRango || '',
                        idCargo: trabajoData.cargo.idCargo || 0,
                        nombreCargo: trabajoData.cargo.nombre || '',
                        tipoAfiliado: trabajoData.tipoAfiliado || '',
                        telefonoOfi: trabajoData.telefonoOfi || '',
                        telefonoAfi: trabajoData.telefonoAfi || '',
                        direccionOfi: trabajoData.direccionOfi || '',
                        direccionAfi: trabajoData.direccionAfi || '',
                        celular: trabajoData.celular || '',
                        baseDate: trabajoData.baseDate || new Date().toISOString(),
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
