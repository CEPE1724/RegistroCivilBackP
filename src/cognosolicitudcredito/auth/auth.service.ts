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
import { Cognosolicitudcredito } from '../entities/cognosolicitudcredito.entity';
import { CognoPersonaNatural }from '../entities/cognopersonanatural.entity';
import { CognoSolicitudLugarNacimiento } from '../entities/cognosolicitudlugarnacimiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AuthService {
    private readonly logger = new Logger('AuthServiceCogno');
    private readonly keycloakUrl = process.env.KEYCLOAK_URL;
    private readonly clientId = process.env.KEYCLOAK_CLIENT_ID;
    private readonly username = process.env.KEYCLOAK_USERNAME;
    private readonly password = process.env.KEYCLOAK_PASSWORD;
    private readonly apiUrl = 'http://app.cognoconsultas.com/consultas/pn_inf_basica/'; // API externa

    constructor(
        @InjectRepository(Cognosolicitudcredito)
        private readonly cognosolicitudcreditoRepository: Repository<Cognosolicitudcredito>,
        
        @InjectRepository(CognoPersonaNatural)
        private readonly cognoPersonaNaturalRepository: Repository<CognoPersonaNatural>, 

        @InjectRepository(CognoSolicitudLugarNacimiento)
        private readonly cognoSolicitudLugarNacimientoRepository: Repository<CognoSolicitudLugarNacimiento>,
   
    
    ) { }


    async getToken(cedula: string): Promise<string> {
        console.log('Cedula recibida:', cedula);
        try {
            // Pasamos la cédula como parte de las credenciales si es necesario
            const data = qs.stringify({
                username: this.username,  // Puedes usar la cédula como username si corresponde
                password: this.password,
                client_id: this.clientId,
                grant_type: 'password',
            });
            console.log("aui esta la data " + data);

            // Solicitud para obtener el token
            const response = await axios.post(this.keycloakUrl, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            console.log(response);

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

        console.log('Token recibido:', token);
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

    async create(apiData: any): Promise<Cognosolicitudcredito> {
        try {

            const existingRecord = await this.cognosolicitudcreditoRepository.findOne({
                where: { Cedula: apiData.personaNatural.identificacion },
            });

            const FechaActualizacion = new Date();
            if (existingRecord) {
                existingRecord.Codigo = apiData.estado.codigo;
                existingRecord.Mensaje = apiData.estado.mensaje;
                existingRecord.FechaActualizacion = FechaActualizacion;
                existingRecord.bInfoPersonal = true;
                existingRecord.bInfoLaboral = false;
                await this.cognosolicitudcreditoRepository.save(existingRecord);
                console.log('Updated record:', existingRecord);  // Verifica el registro actualizado
           
                return existingRecord;
            } else {
                const createCognosolicitudcreditoDto: CreateCognosolicitudcreditoDto = {

                    Cedula: apiData.personaNatural.identificacion,
                    Codigo: apiData.estado.codigo,
                    Mensaje: apiData.estado.mensaje,
                    FechaActualizacion: FechaActualizacion,
                    bInfoPersonal: true,
                    bInfoLaboral: true,
                };

                const newRecord = this.cognosolicitudcreditoRepository.create(createCognosolicitudcreditoDto);
                console.log('Created new record:', newRecord);  // Verifica el nuevo registro creado
           
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

                existingRecord. idNivelEducacion = apiData.nivelEducacion.nivelEducacion.idNivelEducacion;
                existingRecord.NivelEducacion = apiData.nivelEducacion.nivelEducacion.descripcion;
                existingRecord.nivel = apiData.nivelEducacion.nivelEducacion.nivel;

                existingRecord.Tipo = Tipo;

                await this.cognoPersonaNaturalRepository.save(existingRecord);
                return existingRecord;
            }else{
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

            console.log('apiData', apiData);
            /// veirificar si existe la persona natural
            const existingRecord = await this.cognoPersonaNaturalRepository.findOne({
                where: { idCognoSolicitudCredito: idCognoSolicitudCredito, Tipo: 1 },
            });

            /* titutlar*/
            if (existingRecord) {
                // Actualizamos los datos si ya existe
                existingRecord.idCognoSolicitudCredito = idCognoSolicitudCredito;
                existingRecord.identificacion = apiData.personaNaturalConyuge.personaConyuge.identificacion;
                existingRecord.nombre = apiData.personaNaturalConyuge.personaConyuge.nombre;
                existingRecord.nombreUno =  apiData.personaNaturalConyuge.personaConyuge.nombreUno;
                existingRecord.nombreDos =  apiData.personaNaturalConyuge.personaConyuge.nombreDos;
                existingRecord.idTipoIdentificacion = apiData.personaNaturalConyuge.personaConyuge.tipoIdentificacion.idTipoIdentificacion;
                existingRecord.descripcion =  apiData.personaNaturalConyuge.personaConyuge.tipoIdentificacion.descripcion;
                existingRecord.fechaNacimiento = apiData.personaNaturalConyuge.personaConyuge.fechaNacimiento;
                existingRecord.fechaDefuncion =  apiData.personaNaturalConyuge.personaConyuge.fechaDefuncion;
                existingRecord.informacionAdicional = apiData.personaNaturalConyuge.personaConyuge.informacionAdicional;
                existingRecord.idGenero =  apiData.personaNaturalConyuge.personaConyuge.genero.idGenero;
                existingRecord.Genero =  apiData.personaNaturalConyuge.personaConyuge.genero.descripcion;
                existingRecord.lugarDefuncion = apiData.personaNaturalConyuge.personaConyuge.lugarDefuncion;
                existingRecord.apellidoUno =  apiData.personaNaturalConyuge.personaConyuge.apellidoUno;
                existingRecord.apellidoDos =  apiData.personaNaturalConyuge.personaConyuge.apellidoDos;

                existingRecord.idEstadoCivil = 2;
                existingRecord.EstadoCivil = 'CASADO';

                existingRecord.fechaMatrimonio = apiData.personaNaturalConyuge.fechaMatrimonio;

                existingRecord. idNivelEducacion = 0;
                existingRecord.NivelEducacion = '';
                existingRecord.nivel = 0

                existingRecord.Tipo = Tipo;

                await this.cognoPersonaNaturalRepository.save(existingRecord);
                return existingRecord;
            }else{
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
                    Tipo:  Tipo,
                };
                const newRecord = this.cognoPersonaNaturalRepository.create(createCognopersonanaturalDto);
                await this.cognoPersonaNaturalRepository.save(newRecord);
                return newRecord;
            }
        } catch (error) {
            this.handleDBException(error);
        }
    }
    
    async createLugarNacimiento(apiData: any, idCognoSolicitudCredito: number , Tipo: number): Promise<CognoSolicitudLugarNacimiento> {
        try {
        //console.log('apiData', apiData);
        /// veirificar si existe la persona natural
        const existingRecord = await this.cognoSolicitudLugarNacimientoRepository.findOne({
            where: { idCognoSolicitudCredito: idCognoSolicitudCredito },
        });
      
        /* titutlar*/
        if (existingRecord) {
            // Actualizamos los datos si ya existe
            existingRecord.idCognoSolicitudCredito = idCognoSolicitudCredito;
            existingRecord.idLugar = apiData.personaNatural.lugarNacimiento.idLugar;
            existingRecord.codigoPostal = apiData.personaNatural.lugarNacimiento.codigoPostal;
            existingRecord.fechaActualizacion = apiData.personaNatural.lugarNacimiento.fechaActualizacion || null;
            existingRecord.idPais = apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.idPais; 
            existingRecord.Pais = apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.nombre;
            existingRecord.codigoAreaPais = apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.codigoArea;
            existingRecord.codigoIso2 = apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.codigoIso2;
            existingRecord.codigoIso3 = apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.codigoIso3;
            existingRecord.codigoIso = apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.codigoIso;
            existingRecord.idProvincia = apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.idProvincia;
            existingRecord.Provincia = apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.nombre;
            existingRecord.codigoAreaProvincia = apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.codigoArea;
            existingRecord.idCanton = apiData.personaNatural.lugarNacimiento.parroquia.canton.idCanton;
            existingRecord.Canton = apiData.personaNatural.lugarNacimiento.parroquia.canton.nombre;
            existingRecord.idParroquia = apiData.personaNatural.lugarNacimiento.parroquia.idParroquia;
            existingRecord.Parroquia = apiData.personaNatural.lugarNacimiento.parroquia.nombre;
            existingRecord.Tipo = 0;
 
           //// tipo establesco como 0 
           
            await this.cognoSolicitudLugarNacimientoRepository.save(existingRecord);
            return existingRecord;
        }
        else 
        {
            console.log('apiData', apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.codigoIso2);
           const createCognolugarNacimientoDto: CreateCognolugarnacimientoDto= {
            idCognoSolicitudCredito: idCognoSolicitudCredito,
            idLugar: apiData.personaNatural.lugarNacimiento.idLugar,
            codigoPostal: apiData.personaNatural.lugarNacimiento.codigoPostal,
            fechaActualizacion: apiData.personaNatural.lugarNacimiento.fechaActualizacion || null,
            idPais: apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.idPais, 
            Pais: apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.nombre,
            codigoAreaPais: apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.codigoArea,
           codigoIso2: apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.codigoIso2,
           codigoIso3: apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.codigoIso3,
           codigoIso: apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.pais.codigoIso,
           idProvincia: apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.idProvincia,
            Provincia: apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.nombre,
            codigoAreaProvincia: apiData.personaNatural.lugarNacimiento.parroquia.canton.provincia.codigoArea,
            idCanton: apiData.personaNatural.lugarNacimiento.parroquia.canton.idCanton,
            Canton: apiData.personaNatural.lugarNacimiento.parroquia.canton.nombre,
            idParroquia: apiData.personaNatural.lugarNacimiento.parroquia.idParroquia,
            Parroquia: apiData.personaNatural.lugarNacimiento.parroquia.nombre,
            Tipo: 0,
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
        if(error.code === '7956'){
            throw new BadRequestException(error.detail);
        }
        this.logger.error(error);
        throw new InternalServerErrorException('Unexpected error');

    }
}
