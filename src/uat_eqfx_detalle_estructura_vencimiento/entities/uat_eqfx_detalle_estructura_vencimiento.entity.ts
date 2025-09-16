/*CREATE TABLE EQFX_UAT_detalle_estructura_vencimiento (
	idEQFX_UAT_detalle_estructura_vencimiento INT IDENTITY(1,1) PRIMARY KEY,
	idEQFX_IdentificacionConsultada INT NOT NULL,
	fecha_corte DATE NULL,
	vencido_0_a_1 DECIMAL(18,2) DEFAULT 0.00,
	vencido_1_a_2 DECIMAL(18,2) DEFAULT 0.00,
	vencido_2_a_3 DECIMAL(18,2) DEFAULT 0.00,
	vencido_3_a_6 DECIMAL(18,2) DEFAULT 0.00,
	vencido_6_a_9 DECIMAL(18,2) DEFAULT 0.00,
	vencido_9_a_12 DECIMAL(18,2) DEFAULT 0.00,
	vencido_12_a_24 DECIMAL(18,2) DEFAULT 0.00,
	vencido_24 DECIMAL(18,2) DEFAULT 0.00,
	vencido_36 DECIMAL(18,2) DEFAULT 0.00,
	vencido DECIMAL(18,2) DEFAULT 0.00,
	no_devenga_int DECIMAL(18,2) DEFAULT 0.00,
	demanda_judicial DECIMAL(18,2) DEFAULT 0.00,
	cartera_castigada DECIMAL(18,2) DEFAULT 0.00,
	FechaSistema DATETIME DEFAULT GETDATE()
);
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_detalle_estructura_vencimiento')
export class UatEqfxDetalleEstructuraVencimiento {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_detalle_estructura_vencimiento: number;

	@Column({ type: 'int', nullable: false })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'date', nullable: true })
	fecha_corte: Date | null;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	vencido_0_a_1: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	vencido_1_a_2: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	vencido_2_a_3: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	vencido_3_a_6: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	vencido_6_a_9: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	vencido_9_a_12: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	vencido_12_a_24: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	vencido_24: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	vencido_36: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	vencido: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	no_devenga_int: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	demanda_judicial: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	cartera_castigada: number;

	@Column({ type: 'datetime', default: '' })
	FechaSistema: Date;
}
