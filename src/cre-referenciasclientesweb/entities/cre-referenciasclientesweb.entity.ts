
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Cre_ReferenciasClientesWeb') // Explicitly setting the table name
export class CreReferenciasclientesweb {

    @PrimaryGeneratedColumn('increment')
    idCre_ReferenciasClientesWeb: number;

    @Column('int', {
        nullable: true
    })
    idCre_SolicitudWeb: number;

    @Column('int', {
        nullable: true
    })
    idParentesco: number;

    @Column('varchar', {
        length: 60,
        nullable: true
    })
    ApellidoPaterno: string;

    @Column('varchar', {
        length: 60,
        nullable: true
    })

    PrimerNombre: string;

    @Column('varchar', {
        length: 100,
        nullable: true
    })
    SegundoNombre: string;

    @Column('int', {
        nullable: true
    })
    idProvincia: number;

    @Column('int', {
        nullable: true
    })
    idCanton: number;

    @Column('varchar', {
        length: 20,
        nullable: true
    })
    Celular: string;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Usuario: string;

    @Column('datetime', {
        nullable: true
    })
    FechaSistema: Date;

}
