
/*CREATE TABLE [dbo].[Cbo_Riesgos](
	[idCbo_Riesgo] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_Scores_Cobranzas] [int] NULL,
	[Riesgo] [varchar](60) NULL,
	[Peso] [decimal](18, 2) NULL,
	[Desde] [decimal](18, 2) NULL,
	[Hasta] [decimal](18, 2) NULL,
	[FechaSistema] [datetime] NULL,
	[Usuario] [varchar](30) NULL,
	[sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,*/

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'Cbo_Riesgos' })
export class CboRiesgo {

    @PrimaryGeneratedColumn({ name: 'idCbo_Riesgo' })
    idCbo_Riesgo: number;

    @Column({ name: 'idCbo_Scores_Cobranzas', type: 'int', nullable: true })
    idCbo_Scores_Cobranzas?: number;

    @Column({ name: 'Riesgo', type: 'varchar', length: 60, nullable: true })
    Riesgo?: string;

    @Column({ name: 'Peso', type: 'decimal', precision: 18, scale: 2, nullable: true })
    Peso?: number;

    @Column({ name: 'Desde', type: 'decimal', precision: 18, scale: 2, nullable: true })
    Desde?: number;

    @Column({ name: 'Hasta', type: 'decimal', precision: 18, scale: 2, nullable: true })
    Hasta?: number;

    @Column({ name: 'Usuario', type: 'varchar', length: 30, nullable: true })
    Usuario?: string;

    @Column({ name: 'sCbo_Scores_Cobranzas', type: 'uniqueidentifier', nullable: true })
    sCbo_Scores_Cobranzas?: string;
}
