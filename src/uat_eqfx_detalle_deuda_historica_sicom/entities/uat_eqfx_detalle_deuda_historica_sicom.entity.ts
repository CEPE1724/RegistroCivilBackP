/* CREATE TABLE [dbo].[EQFX_UAT_detalle_deuda_historica_sicom](
	[idEQFX_UAT_detalle_deuda_historica_sicom] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NOT NULL,
	[institucion] [varchar](255) NULL,
	[fecha_corte] [date] NULL,
	[tipo_riesgo] [varchar](100) NULL,
	[tipo_credito] [varchar](100) NULL,
	[cupo_monto_original] [decimal](18, 2) NULL,
	[fecha_apertura] [date] NULL,
	[fecha_vencimiento] [date] NULL,
	[total_vencer] [decimal](18, 2) NULL,
	[ndi] [decimal](18, 2) NULL,
	[total_vencido] [decimal](18, 2) NULL,
	[dem_jud] [decimal](18, 2) NULL,
	[cart_cast] [decimal](18, 2) NULL,
	[saldo_deuda] [decimal](18, 2) NULL,
	[dias_morosidad] [int] NULL,
	[FechaSistema] [datetime] NULL,*/

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_detalle_deuda_historica_sicom')
export class UatEqfxDetalleDeudaHistoricaSicom {

	@PrimaryGeneratedColumn()
	idEQFX_UAT_detalle_deuda_historica_sicom: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'varchar', length: 255, nullable: true })
	institucion: string;

	@Column({ type: 'date', nullable: true })
	fecha_corte: Date;

	@Column({ type: 'varchar', length: 100, nullable: true })
	tipo_riesgo: string;

	@Column({ type: 'varchar', length: 100, nullable: true })
	tipo_credito: string;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	cupo_monto_original: number;

	@Column({ type: 'date', nullable: true })
	fecha_apertura: Date;

	@Column({ type: 'date', nullable: true })
	fecha_vencimiento: Date;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	total_vencer: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	ndi: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	total_vencido: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	dem_jud: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	cart_cast: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
	saldo_deuda: number;

	@Column({ type: 'int', nullable: true })
	dias_morosidad: number;
}
