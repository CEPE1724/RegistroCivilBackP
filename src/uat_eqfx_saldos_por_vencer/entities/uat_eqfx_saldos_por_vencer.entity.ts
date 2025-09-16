/*CREATE TABLE EQFX_UAT_saldos_por_vencer (
	idEQFX_UAT_saldos_por_vencer INT IDENTITY(1,1) PRIMARY KEY,
	idEQFX_IdentificacionConsultada INT NOT NULL,
	fecha_corte DATE NULL,
	institucion VARCHAR(255) DEFAULT '' ,
	total_por_vencer DECIMAL(18,2) DEFAULT 0.00,
	por_vencer_0_a_1 DECIMAL(18,2) DEFAULT 0.00,
	por_vencer_1_a_3 DECIMAL(18,2) DEFAULT 0.00,
	por_vencer_3_a_6 DECIMAL(18,2) DEFAULT 0.00,
	por_vencer_6_a_12 DECIMAL(18,2) DEFAULT 0.00,
	por_vencer_12 DECIMAL(18,2) DEFAULT 0.00,
	FechaSistema DATETIME DEFAULT GETDATE()
); */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_saldos_por_vencer')
export class UatEqfxSaldosPorVencer {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_saldos_por_vencer: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'date', nullable: true })
	fecha_corte: Date | null;

	@Column({ type: 'varchar', length: 255, default: '' })
	institucion: string;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	total_por_vencer: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	por_vencer_0_a_1: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	por_vencer_1_a_3: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	por_vencer_3_a_6: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	por_vencer_6_a_12: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	por_vencer_12: number;

	@Column({ type: 'datetime', default: '' })
	FechaSistema: Date;
}
