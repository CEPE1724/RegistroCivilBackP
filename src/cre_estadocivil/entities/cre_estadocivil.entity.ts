
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_EstadoCivil')   
export class CreEstadocivil {

     /*  siempre para la clave primaria*/
     @PrimaryGeneratedColumn('increment') /// llave primaria o primary key
        idEdoCivil: number;
    
    /* de auqi en adlenate siempre se pone el
    nombre de la columna en la base de datos*/
    
        @Column('varchar', {
            length: 50
        })
        Nombre: string;

}
