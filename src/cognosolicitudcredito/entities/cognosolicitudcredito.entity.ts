import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('CognoSolicitudCredito')
export class Cognosolicitudcredito {
    @PrimaryGeneratedColumn('increment')
    idCognoSolicitudCredito: number;

    @Column('int', { default: 0 })
    idCre_SolicitudWeb: number;

    @Column('text', { default: '' })
    Cedula: string;

    @Column('datetime', { default: () => 'GETDATE()' })
    FechaActualizacion: Date;

    @Column('bit', { default: false })
    bInfoPersonal: boolean;

    @Column('bit', { default: false })
    bInfoLaboral: boolean;

    @Column('text', { default: '' })
    Codigo: string;

    @Column('text', { default: '' })
    Mensaje: string;

}