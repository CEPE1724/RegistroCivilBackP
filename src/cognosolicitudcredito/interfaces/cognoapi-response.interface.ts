export interface PersonaNatural {
    estado:                Estado;
    personaNatural:        Persona;
    nacionalidades:        Nacionalidade[];
    profesiones:           Profesione[];
    estadoCivil:           PersonaNaturalEstadoCivil;
    personaNaturalConyuge: PersonaNaturalConyuge;
    nivelEducacion:        PersonaNaturalNivelEducacion;
}

export interface Estado {
    codigo:  string;
    mensaje: string;
}

export interface PersonaNaturalEstadoCivil {
    estadoCivil: EstadoCivilEstadoCivil;
}

export interface EstadoCivilEstadoCivil {
    idEstadoCivil: number;
    descripcion:   string;
}

export interface Nacionalidade {
    pais: Pais;
}

export interface Pais {
    idPais:     number;
    nombre:     Nombre;
    codigoArea: string;
    codigoIso2: CodigoIso2;
    codigoIso3: CodigoIso3;
    codigoIso:  number;
}

export enum CodigoIso2 {
    Ec = "EC",
}

export enum CodigoIso3 {
    Ecu = "ECU",
}

export enum Nombre {
    Ecuador = "Ecuador",
}

export interface PersonaNaturalNivelEducacion {
    nivelEducacion: NivelEducacionNivelEducacion;
}

export interface NivelEducacionNivelEducacion {
    idNivelEducacion: number;
    descripcion:      string;
    nivel:            number;
}

export interface Persona {
    identificacion:       string;
    nombre:               string;
    nombreUno:            null;
    nombreDos:            null;
    tipoIdentificacion:   TipoIdentificacion;
    fechaNacimiento:      Date;
    fechaDefuncion:       null;
    informacionAdicional: null | string;
    genero:               Genero;
    lugarDefuncion:       null;
    lugarNacimiento:      Lugar;
    apellidoUno:          null;
    apellidoDos:          null;
}

export interface Genero {
    idGenero:    number;
    descripcion: string;
}

export interface Lugar {
    idLugar:            number;
    codigoPostal:       string;
    fechaActualizacion: null;
    parroquia:          Parroquia;
    canton:             Canton;
    provincia:          Provincia;
    pais:               Pais;
}

export interface Canton {
    idCanton:  number;
    nombre:    string;
    provincia: Provincia;
}

export interface Provincia {
    idProvincia: number;
    codigoArea:  string;
    nombre:      string;
    pais:        Pais;
}

export interface Parroquia {
    idParroquia: number;
    idProvincia: null;
    idPais:      null;
    nombre:      string;
    canton:      Canton;
}

export interface TipoIdentificacion {
    idTipoIdentificacion: number;
    descripcion:          string;
}

export interface PersonaNaturalConyuge {
    fechaMatrimonio: Date;
    personaConyuge:  Persona;
    lugar:           Lugar;
}

export interface Profesione {
    profesion: Profesion;
}

export interface Profesion {
    idProfesion: number;
    descripcion: string;
}
