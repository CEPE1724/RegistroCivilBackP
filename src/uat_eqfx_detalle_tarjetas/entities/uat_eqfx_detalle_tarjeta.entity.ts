/*CREATE TABLE EQFX_UAT_detalle_tarjetas (
	idEQFX_UAT_detalle_tarjetas INT IDENTITY(1,1) PRIMARY KEY,
	idEQFX_IdentificacionConsultada INT NOT NULL,
	institucion VARCHAR(255) DEFAULT '' ,
	emisor VARCHAR(255) DEFAULT '' ,
	antiguedad INT DEFAULT 0,
	cupo DECIMAL(18,2) DEFAULT 0.00,
	saldo_actual DECIMAL(18,2) DEFAULT 0.00,
	saldo_promedio_ultimos_6_meses DECIMAL(18,2) DEFAULT 0.00,
	porcentaje_uso_tarjeta DECIMAL(5,2) DEFAULT 0.00,
	FechaSistema DATETIME DEFAULT GETDATE()
); */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_detalle_tarjetas')
export class UatEqfxDetalleTarjeta {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_detalle_tarjetas: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'varchar', length: 255, default: '' })
	institucion: string;

	@Column({ type: 'varchar', length: 255, default: '' })
	emisor: string;

	@Column({ type: 'int', default: 0 })
	antiguedad: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	cupo: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	saldo_actual: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	saldo_promedio_ultimos_6_meses: number;

	@Column({ type: 'decimal', precision: 5, scale: 2, default: 0.00 })
	porcentaje_uso_tarjeta: number;

	@Column({ type: 'datetime', default: () => 'GETDATE()' })
	FechaSistema: Date;
}
