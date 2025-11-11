/*CREATE TABLE [dbo].[EQFX_UAT_indicador_impacto_economico](
	[idEQFX_UAT_indicador_impacto_economico] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NOT NULL,
	[indicador] [varchar](255) NULL,
	[ingreso] [decimal](18, 2) NULL,
	[cuota_financiera] [decimal](18, 2) NULL,
	[FechaSistema] [datetime] NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_indicador_impacto_economico')
export class UatEqfxIndicadorImpactoEconomico {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_indicador_impacto_economico: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'varchar', length: 255, default: '' })
	indicador: string;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	ingreso: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	cuota_financiera: number;
}
