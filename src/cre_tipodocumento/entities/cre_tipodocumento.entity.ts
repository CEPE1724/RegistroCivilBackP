

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_TipoDocumento')
export class CreTipodocumento {
    /*  siempre para la clave primaria*/
    @PrimaryGeneratedColumn('increment') /// llave primaria o primary key
    idTipoDoc: number;

/* de auqi en adlenate siempre se pone el
nombre de la columna en la base de datos*/

    @Column('varchar', {
        length: 50
    })
    Nombre: string;

    @Column('varchar', {
        length: 50,
        select: false
    })
    CodPichincha: string;

}
