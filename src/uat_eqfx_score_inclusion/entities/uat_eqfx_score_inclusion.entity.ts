/*CREATE TABLE EQFX_UAT_score_inclusion (
	idEQFX_UAT_score_inclusion INT IDENTITY(1,1) PRIMARY KEY,
	idEQFX_IdentificacionConsultada INT NOT NULL,
	score INT DEFAULT 0,
	total_acum DECIMAL(18,2) DEFAULT 0.00,
	tasa_de_malos_acum DECIMAL(18,2) DEFAULT 0.00,
	score_min INT DEFAULT 0,
	score_max INT DEFAULT 0,
	fecha_inicial DATE NULL,
	fecha_final DATE NULL,
	FechaSistema DATETIME DEFAULT GETDATE()
); */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('EQFX_UAT_score_inclusion')
export class UatEqfxScoreInclusion {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_score_inclusion: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'int', default: 0 })
	score: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	total_acum: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	tasa_de_malos_acum: number;

	@Column({ type: 'int', default: 0 })
	score_min: number;

	@Column({ type: 'int', default: 0 })
	score_max: number;

	@Column({ type: 'date', nullable: true })
	fecha_inicial: Date | null;

	@Column({ type: 'date', nullable: true })
	fecha_final: Date | null;

	@Column({ type: 'datetime', default: () => 'GETDATE()' })
	FechaSistema: Date;
}
