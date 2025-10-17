/*CREATE TABLE [dbo].[EQFX_UAT_score_sobreendeudamiento](
	[idEQFX_UAT_score_sobreendeudamiento] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NOT NULL,
	[score] [int] NULL,
	[rango_score] [varchar](50) NULL,
	[segmentacion] [varchar](50) NULL,
	[porcentaje] [decimal](18, 2) NULL,
	[probabilidad_sobre_endeudamiento] [decimal](18, 2) NULL,
	[fecha_inicial] [date] NULL,
	[fecha_final] [date] NULL,
	[FechaSistema] [datetime] NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_score_sobreendeudamiento')
export class UatEqfxScoreSobreendeudamiento {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_score_sobreendeudamiento: number;

	@Column({ type: 'int', nullable: true })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'int', nullable: true })
	score: number;

	@Column({ type: 'varchar', length: 50, nullable: true })
	rango_score: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	segmentacion: string;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	porcentaje: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	probabilidad_sobre_endeudamiento: number;

	@Column({ type: 'date', nullable: true })
	fecha_inicial: Date;

	@Column({ type: 'date', nullable: true })
	fecha_final: Date;

	@Column({ type: 'datetime', nullable: true })
	FechaSistema: Date;
}
