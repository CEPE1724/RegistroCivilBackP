/*CREATE TABLE [dbo].[EQFX_UAT_cuota_estimada_mensual](
	[idEQFX_UAT_cuota_estimada_mensual] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NOT NULL,
	[pago] [decimal](18, 2) NULL,
	[numero_creditos_comercial] [int] NULL,
	[total_vencido] [decimal](18, 2) NULL,
	[total_demanda] [decimal](18, 2) NULL,
	[total_cartera] [decimal](18, 2) NULL,
	[numero_creditos_iece] [int] NULL,
	[numero_operaciones_excluidas] [int] NULL,
	[FechaSistema] [datetime] NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_cuota_estimada_mensual')
export class UatEqfxCuotaEstMen {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_cuota_estimada_mensual: number;

	@Column({ type: 'int', nullable: false })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	pago: number;

	@Column({ type: 'int', nullable: true })
	numero_creditos_comercial: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	total_vencido: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	total_demanda: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	total_cartera: number;

	@Column({ type: 'int', nullable: true })
	numero_creditos_iece: number;

	@Column({ type: 'int', nullable: true })
	numero_operaciones_excluidas: number;

	@Column({ type: 'datetime', nullable: true })
	FechaSistema: Date;
}