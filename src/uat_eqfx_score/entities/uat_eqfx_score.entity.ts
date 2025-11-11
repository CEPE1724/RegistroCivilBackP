/*CREATE TABLE [dbo].[EQFX_UAT_score](
	[idEQFX_UAT_score] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NOT NULL,
	[score] [int] NULL,
	[total_acum] [decimal](18, 2) NULL,
	[tasa_de_malos_acum] [decimal](18, 2) NULL,
	[score_min] [int] NULL,
	[score_max] [int] NULL,
	[fecha_inicial] [date] NULL,
	[fecha_final] [date] NULL,
	[FechaSistema] [datetime] NULL, */ 

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('EQFX_UAT_score')
export class UatEqfxScore {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_score: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'int', nullable: true })
	score: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	total_acum: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	tasa_de_malos_acum: number;

	@Column({ type: 'int', nullable: true })
	score_min: number;

	@Column({ type: 'int', nullable: true })
	score_max: number;

	@Column({ type: 'date', nullable: true })
	fecha_inicial: Date;

	@Column({ type: 'date', nullable: true })
	fecha_final: Date;

	@Column({ type: 'datetime', nullable: true })
	FechaSistema: Date;
}
