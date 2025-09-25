

import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity('CognoTrabajo')
export class CognoTrabajo {

    @PrimaryGeneratedColumn('increment')
    idCognoTrabajo: number;

    @Column('int', {
        default: 0
    })
    idCognoSolicitudCredito: number;

    @Column('bigint')
    fechaActualizacion: number;

    @Column('bigint')
    fechaIngreso: number;

    @Column('bigint')
    fechaAfiliacionHasta: number;

    @Column('varchar', {
        length: 50
    })
    identificacionPersonaPatrono: string;

    @Column('varchar', {
        length: 200
    })
    nombrePatrono: string;

    @Column('varchar', {
        length: 200
    })
    nombreUno: string;

    @Column('varchar', {
        length: 200
    })
    nombreDos: string;

    @Column('int')
    idTipoIdentificacion: number;

    @Column('varchar', {
        length: 30
    })
    descripcion: string;

    @Column('date')
    plazoSocial: Date;

    @Column('int')
    expediente: number;

    @Column('date')
    fechaConstitucion: Date;

    @Column('varchar', {
        length: 200
    })
    nombreComercial: string;

    @Column('int')
    idTipoCompania: number;

    @Column('varchar', {
        length: 200
    })
    nombretipoCompania: string;

    @Column('int')
    idCanton: number;

    @Column('varchar', {
        length: 200
    })
    nombreCanton: string;

    @Column('int')
    idProvincia: number;

    @Column('varchar', {
        length: 10
    })
    codigoArea: string;

    @Column('varchar', {
        length: 200
    })
    nombreProvincia: string;

    @Column('int')
    idPais: number;

    @Column('varchar', {
        length: 200
    })
    nombrePais: string;

    @Column('varchar', {
        length: 10
    })
    codigoAreaPais: string;

    @Column('varchar', {
        length: 5
    })
    codigoIso2: string;

    @Column('varchar', {
        length: 5
    })
    codigoIso3: string;

    @Column('int')
    codigoIso: number;

    @Column('varchar', {
        length: 200
    })
    nombreSituacionLegal: string;

    @Column('varchar', {
        length: 10
    })
    proveedoraEstado: string;

    @Column('varchar', {
        length: 10
    })
    pagoRemesas: string;

    @Column('varchar', {
        length: 10
    })
    vendeCredito: string;

    @Column('decimal', {
        precision: 18,
        scale: 2
    })
    capitalSuscrito: number;

    @Column('decimal', {
        precision: 18,
        scale: 2
    })
    capitalAutorizado: number;

    @Column('decimal', {
        precision: 18,
        scale: 2
    })
    valorNominal: number;

    @Column('varchar', {
        length: 10
    })
    perteneceMv: string;

    @Column('varchar', {
        length: 200
    })
    apellidoUno: string;

    @Column('varchar', {
        length: 200
    })
    apellidoDos: string;

    @Column('decimal', {
        precision: 18,
        scale: 2
    })
    valor: number;

    @Column('varchar', {
        length: 200
    })
    tipoIngreso: string;

    @Column('varchar', {
        length: 200
    })
    frecuenciaIngreso: string;

    @Column('varchar', {
        length: 200
    })
    valorRango: string;

    @Column('int')
    idCargo: number;

    @Column('varchar', {
        length: 200
    })
    nombreCargo: string;

    @Column('varchar', {
        length: 200
    })
    tipoAfiliado: string;

    @Column('varchar', {
        length: 50
    })
    telefonoOfi: string;

    @Column('varchar', {
        length: 50
    })
    telefonoAfi: string;

    @Column('varchar', {
        length: 255
    })
    direccionOfi: string;

    @Column('varchar', {
        length: 255
    })
    direccionAfi: string;

    @Column('varchar', {
        length: 20
    })
    celular: string;

    @Column('varchar', {
        length: 50
    })
    baseDate: string;

    @Column('int')
    Jubilado: number;

    

}