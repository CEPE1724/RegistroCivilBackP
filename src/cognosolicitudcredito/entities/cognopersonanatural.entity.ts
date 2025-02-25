
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity('CognoPersonaNatural')
export class CognoPersonaNatural {
  
    @PrimaryGeneratedColumn('increment')
    idCognoPersonaNatural: number;

    @Column('int', {
        default: 0
    })
    idCognoSolicitudCredito: number;

    @Column('text', {
        default: ''
    })

    identificacion: string;

    @Column('text', {
        default: ''
    })

    nombre: string;

    @Column('text', {
        default: ''
    })

    nombreUno: string;

    @Column('text', {
        default: ''
    })

    nombreDos: string;

    @Column('int', {
        default: 0
    })

    idTipoIdentificacion: number;

    @Column('text', {
        default: ''
    })

    descripcion: string;

    @Column('date')

    fechaNacimiento: Date;

    @Column('date')

    fechaDefuncion: Date;

    @Column('text', {
        default: ''
    })

    informacionAdicional: string;

    @Column('int', {
        default: 0
    })

    idGenero: number;

    @Column('text', {
        default: ''
    })

    Genero: string;

    @Column('text', {
        default: ''
    })

    lugarDefuncion: string;

    @Column('text', {
        default: ''
    })

    apellidoUno: string;

    @Column('text', {
        default: ''
    })

    apellidoDos: string;

    @Column('int', {
        default: 0
    })

    idEstadoCivil: number;

    @Column('text', {
        default: ''
    })

    EstadoCivil: string;

    @Column('date')

    fechaMatrimonio: Date;

    @Column('int', {
        default: 0
    })

    idNivelEducacion: number;

    @Column('text', {
        default: ''
    })

    NivelEducacion: string;

    @Column('int', {
        default: 0
    })

    nivel: number;

    @Column('int', {
        default: 0
    })

    Tipo: number;

}
