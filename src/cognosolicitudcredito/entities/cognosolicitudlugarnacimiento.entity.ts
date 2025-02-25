
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn , BeforeInsert} from 'typeorm';

@Entity('CognoSolicitudLugarNacimiento')
export class CognoSolicitudLugarNacimiento {
    @PrimaryGeneratedColumn('increment')
    idCognoSolicitudLugarNacimiento: number;

    @Column('int', {
        default: 0
    })
    idCognoSolicitudCredito: number;

    @Column('int')
    idLugar: number;

    @Column('varchar', {
        length: 20
    })
    codigoPostal: string;

    @Column('date')
    fechaActualizacion: Date;

    @Column('int')
    idPais: number;

    @Column('varchar', {
        length: 200
    })
    Pais: string;

    @Column('varchar', {
        length: 10
    })
    codigoAreaPais: string;

    @Column('varchar', {
        length: 5
    })
    codigoIso2: string;

    @Column('varchar', {
        length :3
    })
    codigoIso3: string;

    @Column('int')
    codigoIso: number;

    @Column('int')
    idProvincia: number;

    @Column('varchar', {
        length: 200
    })
    Provincia: string;

    @Column('varchar', {
        length: 10
    })
    codigoAreaProvincia: string;

    @Column('int')
    idCanton: number;

    @Column('varchar', {
        length: 200
    })
    Canton: string;

    @Column('int')
    idParroquia: number;

    @Column('varchar', {
        length: 200
    })
    Parroquia: string;

    @Column('int', {
        default: 0
    })
    Tipo: number;
}


    
