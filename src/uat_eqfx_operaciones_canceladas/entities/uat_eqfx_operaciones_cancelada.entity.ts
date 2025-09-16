/*CREATE TABLE [dbo].[EQFX_UAT_operaciones_canceladas](
	[idEQFX_UAT_operaciones_canceladas] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NOT NULL,
	[fecha_corte] [date] NULL,
	[institucion] [varchar](255) NULL,
	[numero_operacion] [varchar](50) NULL,
	[fecha_cancelacion] [date] NULL,
	[FechaSistema] [datetime] NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_operaciones_canceladas')
export class UatEqfxOperacionesCancelada {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_operaciones_canceladas: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'date', nullable: true })
	fecha_corte: Date | null;

	@Column({ type: 'varchar', length: 255, nullable: true })
	institucion: string | null;

	@Column({ type: 'varchar', length: 50, nullable: true })
	numero_operacion: string | null;

	@Column({ type: 'date', nullable: true })
	fecha_cancelacion: Date | null;

	@Column({ type: 'datetime', nullable: true })
	FechaSistema: Date | null;
}
