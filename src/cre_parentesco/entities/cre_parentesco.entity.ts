import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_Parentesco')
export class CreParentesco {

    @PrimaryGeneratedColumn('increment')
    idParentesco: number;

    @Column('varchar', {
        length: 50
    })
    Nombre: string;
}
