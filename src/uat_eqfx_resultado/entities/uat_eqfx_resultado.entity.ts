/*CREATE TABLE [dbo].[EQFX_UAT_resultado](
	[idEQFX_UAT_resultado] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NOT NULL,
	[variable] [nvarchar](255) NULL,
	[resultado] [nvarchar](255) NULL,
	[FechaSistema] [datetime] NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_resultado')
export class UatEqfxResultado {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_resultado: number;

	@Column({ type: 'int', nullable: true })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'nvarchar', length: 255, nullable: true })
	variable: string;

	@Column({ type: 'nvarchar', length: 255, nullable: true })
	resultado: string;
}
