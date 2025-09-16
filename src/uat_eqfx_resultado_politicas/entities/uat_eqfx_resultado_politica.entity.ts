/*CREATE  TABLE EQFX_UAT_resultado_politicas (
	idEQFX_UAT_resultado_politicas INT IDENTITY(1,1) PRIMARY KEY,
	idEQFX_IdentificacionConsultada INT NOT NULL,
	politica VARCHAR(255) DEFAULT '' ,
	valor VARCHAR(255) DEFAULT '' ,
	decision VARCHAR(255) DEFAULT '' ,
	FechaSistema DATETIME DEFAULT GETDATE(),
); */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_resultado_politicas')
export class UatEqfxResultadoPolitica {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_resultado_politicas: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'varchar', length: 255, default: '' })
	politica: string;

	@Column({ type: 'varchar', length: 255, default: '' })
	valor: string;

	@Column({ type: 'varchar', length: 255, default: '' })
	decision: string;

	@Column({ type: 'datetime', default: () => 'GETDATE()' })
	FechaSistema: Date;

}
