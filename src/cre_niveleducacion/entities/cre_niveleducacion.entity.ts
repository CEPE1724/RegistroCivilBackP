import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_NivelEducacion')
export class CreNiveleducacion {
    @PrimaryGeneratedColumn('increment')
    idNivelEducacion: number;

    @Column('varchar', {
        length: 50
    })
    Nombre: string;
}
