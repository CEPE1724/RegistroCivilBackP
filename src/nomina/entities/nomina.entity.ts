
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('Nomina')
export class Nomina {

    @PrimaryGeneratedColumn()
    idNomina: number;

    @Column({ type: 'int', nullable: true })
    NIdentificacion: number;

    @Column({ type: 'int', nullable: true })
    idPersonal: number;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    ApellidoPaterno: string;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    
    ApellidoMaterno: string;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    PrimerNombre: string;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    SegundoNombre: string;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    Codigo: string;


}
