
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity('Cre_ActividadEconomica')  // Explicitly setting the table name
export class CreActividadeconomina {

    @PrimaryGeneratedColumn('increment')
    idActEconomica: number;

    @Column({ type: 'varchar', length: 5, nullable: true })
    Codigo: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    FuenIngrs: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    Nombre: string;

    @Column({ type: 'varchar', length: 1, nullable: true })
    CodPichincha: string;

    @Column({ type: 'int', nullable: true })
    idEntidadFinanciera: number;

    @Column({ type: 'int', nullable: true })
    idFuenteIngreso: number;

    @Column({ type: 'varchar', length: 5, nullable: true })
    Codigo_BA: string;

    @Column({ type: 'int', nullable: true })
    Tipo: number;

}








