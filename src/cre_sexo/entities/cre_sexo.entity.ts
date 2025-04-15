import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_Sexo')
export class CreSexo {
    /* clave primaria*/
    @PrimaryGeneratedColumn('increment') /// llave primaria o primary key
    idSexo: number;

/* columna base de datos*/

    @Column('varchar', {
        length: 50
    })
    Nombre: string;
}
