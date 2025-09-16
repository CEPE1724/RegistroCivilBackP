/*CREATE TABLE EQFX_UAT_valor_deuda_3_sistemas (
	idEQFX_UAT_valor_deuda_3_sistemas INT IDENTITY(1,1) PRIMARY KEY,
	idEQFX_IdentificacionConsultada INT NOT NULL,
	institucion NVARCHAR(255) DEFAULT '' ,
	por_vencer DECIMAL(18,2) DEFAULT 0.00,
	no_devenga_int DECIMAL(18,2) DEFAULT 0.00,
	vencido DECIMAL(18,2) DEFAULT 0.00,
	total DECIMAL(18,2) DEFAULT 0.00,
	demanda_judicial DECIMAL(18,2) DEFAULT 0.00,
	cartera_castigada DECIMAL(18,2) DEFAULT 0.00,
	FechaSistema DATETIME DEFAULT GETDATE()
);
 */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('EQFX_UAT_valor_deuda_3_sistemas')
export class UatEqfxValorDeuda3Sistema {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_valor_deuda_3_sistemas: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'nvarchar', length: 255, default: '' })
	institucion: string;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	por_vencer: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	no_devenga_int: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	vencido: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	total: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	demanda_judicial: number;

	@Column({ type: 'decimal', precision: 18, scale: 2, default: 0.00 })
	cartera_castigada: number;

	@Column({ type: 'datetime', default: '' })
	FechaSistema: Date;
}
