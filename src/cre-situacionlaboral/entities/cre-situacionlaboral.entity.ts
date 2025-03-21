
import {
    IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate, IsOptional, IsPositive,
    MinLength
} from 'class-validator';
import { Entity, PrimaryGeneratedColumn,  Column } from 'typeorm';

@Entity('Cre_SituacionLaboral')
export class CreSituacionlaboral {
    @PrimaryGeneratedColumn('increment')
    idSituacionLaboral: number;

    @Column('varchar', {
        length: 1,
        nullable: true
    })
    Codigo: string;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Descripcion: string;

    @Column('int', {
        nullable: true
    })
    idEntidadFinanciera: number;
}
