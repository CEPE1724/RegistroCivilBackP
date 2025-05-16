import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Para generar UUIDs manualmente, si es necesario

@Entity('CognoSolicitudCredito')
export class Cognosolicitudcredito {
    @PrimaryColumn('uuid') // Usamos 'uuid' como tipo para la columna primaria
    idCognoSolicitudCredito: string;

    @Column('int', { default: 0 })
    idCre_SolicitudWeb: string;

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