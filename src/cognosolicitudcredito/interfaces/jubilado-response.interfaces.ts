export interface JubiladoResponse {
    success: boolean;
    mensaje?: string;
    data?: JubiladoInterface;
}

export interface JubiladoInterface {
    estado:   Estado;
    trabajos: Trabajo[];
}

export interface Estado {
    codigo:  string;
    mensaje: string;
}

export interface Trabajo {
    fechaActualizacion:   number;
    fechaIngreso:         null;
    fechaAfiliacionHasta: null;
    personaPatrono:       PersonaPatrono;
    personaEmpleado:      PersonaEmpleado;
    personaIngreso:       PersonaIngreso;
    cargo:                null;
    tipoAfiliado:         TipoAfiliado;
    telefonoOfi:          null;
    telefonoAfi:          null;
    direccionOfi:         null;
    direccionAfi:         null;
    celular:              null;
    baseDate:             null;
}

export interface PersonaEmpleado {
    identificacion:       string;
    nombre:               string;
    nombreUno:            null;
    nombreDos:            null;
    tipoIdentificacion:   TipoIdentificacion;
    fechaNacimiento:      number;
    fechaDefuncion:       null;
    informacionAdicional: null;
    genero:               Genero;
    lugarDefuncion:       null;
    lugarNacimiento:      LugarNacimiento;
    apellidoUno:          null;
    apellidoDos:          null;
}

export interface Genero {
    idGenero:    number;
    descripcion: string;
}

export interface LugarNacimiento {
    idLugar:            number;
    codigoPostal:       string;
    fechaActualizacion: null;
    parroquia:          Parroquia;
    canton:             null;
    provincia:          null;
    pais:               null;
}

export interface Parroquia {
    idParroquia: number;
    idProvincia: null;
    idPais:      null;
    nombre:      string;
    canton:      OficinaControl;
}

export interface OficinaControl {
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

export interface Pais {
    idPais:     number;
    nombre:     string;
    codigoArea: string;
    codigoIso2: string;
    codigoIso3: string;
    codigoIso:  number;
}

export interface TipoIdentificacion {
    idTipoIdentificacion: number;
    descripcion:          string;
}

export interface PersonaIngreso {
    valor:             number;
    tipoIngreso:       TipoIngreso;
    frecuenciaIngreso: FrecuenciaIngreso;
    valorRango:        string;
}

export interface FrecuenciaIngreso {
    idFrecuenciaIngreso: number;
    descripcion:         string;
}

export interface TipoIngreso {
    idTipoIngreso: number;
    nombre:        string;
}

export interface PersonaPatrono {
    identificacion:     string;
    nombre:             string;
    nombreUno:          null;
    nombreDos:          null;
    tipoIdentificacion: TipoIdentificacion;
    plazoSocial:        null;
    expediente:         number;
    fechaConstitucion:  number;
    nombreComercial:    string;
    tipoCompania:       null;
    oficinaControl:     OficinaControl;
    situacionLegal:     null;
    proveedoraEstado:   null;
    pagoRemesas:        null;
    vendeCredito:       null;
    capitalSuscrito:    number;
    capitalAutorizado:  number;
    valorNominal:       null;
    perteneceMv:        null;
    apellidoUno:        null;
    apellidoDos:        null;
}

export interface TipoAfiliado {
    idTipoAfiliado: number;
    nombre:         string;
}
