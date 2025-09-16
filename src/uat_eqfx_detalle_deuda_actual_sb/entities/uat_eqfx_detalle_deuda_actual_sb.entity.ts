/*CREATE  TABLE EQFX_UAT_detalle_deuda_actual_sb (
	idEQFX_UAT_detalle_deuda_actual_sb INT IDENTITY(1,1) PRIMARY KEY,
	idEQFX_IdentificacionConsultada INT NOT NULL,
	institucion VARCHAR(255) DEFAULT '' ,
	fecha_corte DATE NULL,
	tipo_riesgo VARCHAR(100) DEFAULT '' ,
	tipo_credito VARCHAR(100) DEFAULT '' ,
	cupo_monto_original DECIMAL(18,2) DEFAULT 0.00,
	fecha_apertura DATE NULL,
	fecha_vencimiento DATE NULL,
	total_vencer DECIMAL(18,2) DEFAULT 0.00,
	ndi DECIMAL(18,2) DEFAULT 0.00,
	total_vencido DECIMAL(18,2) DEFAULT 0.00,
	dem_jud DECIMAL(18,2) DEFAULT 0.00,
	cart_cast DECIMAL(18,2) DEFAULT 0.00,
	saldo_deuda DECIMAL(18,2) DEFAULT 0.00,
	cuota_mensual DECIMAL(18,2) DEFAULT 0.00,
	dias_morosidad INT DEFAULT 0,
	FechaSistema DATETIME DEFAULT GETDATE()
); */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_detalle_deuda_actual_sb')
export class UatEqfxDetalleDeudaActualSb {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_detalle_deuda_actual_sb: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'varchar', length: 255, default: '' })
	institucion: string;

	@Column({ type: 'date', nullable: true })
	fecha_corte: Date | null;

	@Column({ type: 'varchar', length: 100, default: '' })
	tipo_riesgo: string;

	@Column({ type: 'varchar', length: 100, default: '' })
	tipo_credito: string;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	cupo_monto_original: number;

	@Column({ type: 'date', nullable: true })
	fecha_apertura: Date | null;

	@Column({ type: 'date', nullable: true })
	fecha_vencimiento: Date | null;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	total_vencer: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	ndi: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	total_vencido: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	dem_jud: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	cart_cast: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	saldo_deuda: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	cuota_mensual: number;

	@Column({ type: 'int', default: 0 })
	dias_morosidad: number;

	@Column({ type: 'datetime', default: '' })
	FechaSistema: Date;
}
