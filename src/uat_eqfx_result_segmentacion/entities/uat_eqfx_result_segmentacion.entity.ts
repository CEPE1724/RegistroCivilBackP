/*CREATE TABLE [dbo].[EQFX_UAT_resultado_segmentacion](
	[idEQFX_UAT_resultado_segmentacion] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NOT NULL,
	[resultado_evaluacion] [nvarchar](255) NULL,
	[segmentacion_cliente] [nvarchar](255) NULL,
	[modelo_utilizado] [nvarchar](255) NULL,
	[FechaSistema] [datetime] NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_resultado_segmentacion')
export class UatEqfxResultSegmentacion {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_resultado_segmentacion: number;

	@Column({ type: 'int', nullable: true })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'nvarchar', length: 255, nullable: true })
	resultado_evaluacion: string;

	@Column({ type: 'nvarchar', length: 255, nullable: true })
	segmentacion_cliente: string;

	@Column({ type: 'nvarchar', length: 255, nullable: true })
	modelo_utilizado: string;

	@Column({ type: 'datetime', nullable: true })
	FechaSistema: Date;

}
