import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_Profesion')
export class CreProfesion {
    @PrimaryGeneratedColumn('increment')
    idProfesion: number;

    @Column('varchar', {
        length: 50
    })
    Nombre: string;
}
