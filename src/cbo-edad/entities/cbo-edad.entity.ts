/*
CREATE TABLE [dbo].[Cbo_Edad](
    [idCbo_Edad] [int] IDENTITY(1,1) NOT NULL,
    [idCbo_Scores_Cobranzas] [int] NULL,
    [Desde] [decimal](18, 2) NULL,
    [Hasta] [decimal](18, 2) NULL,
    [idCbo_Riesgo] [int] NULL,
    [Puntaje] [int] NULL,
    [sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,
 CONSTRAINT [PK__Cbo_Edad__466251ECA1CDBFC4] PRIMARY KEY CLUSTERED */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CboRiesgoestado } from 'src/cbo-riesgo/entities/cbo-riesgo.entity';
@Entity({ name: 'Cbo_Edad' })

export class CboEdad {
    @PrimaryGeneratedColumn({ name: 'idCbo_Edad' })
    idCbo_Edad: number;

    @Column({ name: 'idCbo_Scores_Cobranzas', type: 'int', nullable: true })
    idCbo_Scores_Cobranzas?: number;

    @Column({ name: 'Desde', type: 'decimal', precision: 18, scale: 2, nullable: true })
    Desde?: number;

    @Column({ name: 'Hasta', type: 'decimal', precision: 18, scale: 2, nullable: true })
    Hasta?: number;

    @Column({ name: 'idCbo_Riesgo', type: 'int', nullable: true })
    idCbo_Riesgo?: number;

    @Column({ name: 'Puntaje', type: 'int', nullable: true })
    Puntaje?: number;

    @Column({ name: 'sCbo_Scores_Cobranzas', type: 'uniqueidentifier', nullable: true })
    sCbo_Scores_Cobranzas?: string;

    @ManyToOne(() => CboRiesgoestado, { eager: true })
    @JoinColumn({ name: 'idCbo_Riesgo', referencedColumnName: 'idCbo_Riesgo' })
    cboRiesgoData?: CboRiesgoestado;
}
