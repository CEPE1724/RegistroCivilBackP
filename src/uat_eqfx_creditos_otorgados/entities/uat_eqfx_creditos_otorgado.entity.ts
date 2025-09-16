/*CREATE TABLE EQFX_UAT_creditos_otorgados (
	idEQFX_UAT_creditos_otorgados INT IDENTITY(1,1) PRIMARY KEY,
	idEQFX_IdentificacionConsultada INT NOT NULL,
	institucion VARCHAR(255) DEFAULT '' ,
	estado_operacion VARCHAR(50) DEFAULT '' ,
	tipo_credito VARCHAR(50) DEFAULT '' ,
	valor_operacion DECIMAL(18,2) DEFAULT 0.00,
	titular DECIMAL(18,2) DEFAULT 0.00,
	codeudor DECIMAL(18,2) DEFAULT 0.00,
	garante DECIMAL(18,2) DEFAULT 0.00,
	fecha_concesion DATE NULL,
	fecha_vencimiento DATE NULL,
	FechaSistema DATETIME DEFAULT GETDATE()
);*/


import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_creditos_otorgados')
export class UatEqfxCreditosOtorgado {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_creditos_otorgados: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number

	@Column({ type: 'varchar', length: 255, default: '' })
	institucion: string;

	@Column({ type: 'varchar', length: 50, default: '' })
	estado_operacion: string;

	@Column({ type: 'varchar', length: 50, default: '' })
	tipo_credito: string;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	valor_operacion: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	titular: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	codeudor: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	garante: number;

	@Column({ type: 'date', nullable: true })
	fecha_concesion: Date;

	@Column({ type: 'date', nullable: true })
	fecha_vencimiento: Date;

	@Column({ type: 'datetime', default: '' })
	FechaSistema: Date;
}
