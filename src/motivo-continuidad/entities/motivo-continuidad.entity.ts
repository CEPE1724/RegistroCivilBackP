
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('MotivoContinuidad')
export class MotivoContinuidadEntity {
    @PrimaryGeneratedColumn('increment')
    idMotivoContinuidad: number;

    @Column('varchar', {
        length: 100,
        nullable: true
    })
    Nombre: string;
}