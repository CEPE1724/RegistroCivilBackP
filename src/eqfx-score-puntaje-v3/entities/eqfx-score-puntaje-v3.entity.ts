/*
CREATE TABLE [dbo].[EQFX_ScorePuntajeyGraficoV3](
	[idEQFX_ScorePuntajeyGraficoV3] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[Score] [int] NULL,
	[TotalAcum] [decimal](15, 2) NULL,
	[TasaDeMalosAcum] [decimal](15, 2) NULL,
	[ScoreMin] [int] NULL,
	[ScoreMax] [int] NULL,
	[FechaInicial] [datetime] NULL,
	[FechaFinal] [datetime] NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL,*/ 

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_ScorePuntajeyGraficoV3')
export class EqfxScorePuntajeV3 {
	@PrimaryGeneratedColumn()
	idEQFX_ScorePuntajeyGraficoV3: number;

	@Column({ type: 'int', nullable: true })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'int', nullable: true })
	Score: number;

	@Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
	TotalAcum: number;

	@Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
	TasaDeMalosAcum: number;

	@Column({ type: 'int', nullable: true })
	ScoreMin: number;

	@Column({ type: 'int', nullable: true })
	ScoreMax: number;

	@Column({ type: 'datetime', nullable: true })
	FechaInicial: Date;

	@Column({ type: 'datetime', nullable: true })
	FechaFinal: Date;

	@Column({ type: 'datetime', nullable: true })
	FechaSistema: Date;

	@Column({ length: 50, nullable: true })
	Estacion: string;

	@Column({ length: 50, nullable: true })
	Usuario: string;
}
