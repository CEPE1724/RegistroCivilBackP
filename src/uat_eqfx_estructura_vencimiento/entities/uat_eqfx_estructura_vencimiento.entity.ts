/*CREATE TABLE EQFX_UAT_estructura_vencimiento (
    idEQFX_UAT_estructura_vencimiento INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    fecha_corte DATE NULL,
    institucion VARCHAR(255) DEFAULT '' ,
    por_vencer DECIMAL(18,2) DEFAULT 0.00,
    vencido DECIMAL(18,2) DEFAULT 0.00,
    no_devenga_int DECIMAL(18,2) DEFAULT 0.00,
    saldo_deuda DECIMAL(18,2) DEFAULT 0.00,
    demanda_judicial DECIMAL(18,2) DEFAULT 0.00,
    cartera_castigada DECIMAL(18,2) DEFAULT 0.00,
    acuerdo_concordatorio VARCHAR(50) DEFAULT '' ,
    opcion VARCHAR(50) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
); */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_estructura_vencimiento')
export class UatEqfxEstructuraVencimiento {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_estructura_vencimiento: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'date', nullable: true })
	fecha_corte: Date | null;

	@Column({ type: 'varchar', length: 255, default: '' })
	institucion: string;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	por_vencer: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	vencido: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	no_devenga_int: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	saldo_deuda: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	demanda_judicial: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
	cartera_castigada: number;

	@Column({ type: 'varchar', length: 50, default: '' })
	acuerdo_concordatorio: string;

	@Column({ type: 'varchar', length: 50, default: '' })
	opcion: string;

	@Column({ type: 'datetime', default: '' })
	FechaSistema: Date;
}
