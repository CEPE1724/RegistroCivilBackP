
// src/cbo-gestor/cbo-gestor-cobranzas.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'Cbo_Scores_Cobranzas' })
export class CboScoresCobranza {
    @PrimaryGeneratedColumn({ name: 'idCbo_Scores_Cobranzas' })
    idCbo_Scores_Cobranzas: number;

    @Column({ name: 'Desde', type: 'date', nullable: true })
    Desde?: Date;

    @Column({ name: 'Hasta', type: 'date', nullable: true })
    Hasta?: Date;

    @Column({ name: 'Descripcion', type: 'varchar', length: 100, nullable: true })
    Descripcion?: string;

    @Column({ name: 'Estado', type: 'int', nullable: true })
    Estado?: number;

    @Column({ name: 'FechaSistema', type: 'datetime', nullable: true })
    FechaSistema?: Date;

    @Column({ name: 'Usuario', type: 'varchar', length: 30, nullable: true })
    Usuario?: string;

    @Column({ name: 'sCbo_Scores_Cobranzas', type: 'uniqueidentifier', nullable: true })
    sCbo_Scores_Cobranzas?: string;
}
