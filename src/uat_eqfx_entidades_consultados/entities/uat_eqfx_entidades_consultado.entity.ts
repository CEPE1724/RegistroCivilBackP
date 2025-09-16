/*CREATE TABLE EQFX_UAT_entidades_consultados (
	idEQFX_UAT_entidades_consultados INT IDENTITY(1,1) PRIMARY KEY,
	idEQFX_IdentificacionConsultada INT NOT NULL,
	nombre_cliente VARCHAR(255) DEFAULT '' ,
	mes1 VARCHAR(10) DEFAULT '' ,
	mes2 VARCHAR(10) DEFAULT '' ,
	mes3 VARCHAR(10) DEFAULT '' ,
	mes4 VARCHAR(10) DEFAULT '' ,
	mes5 VARCHAR(10) DEFAULT '' ,
	mes6 VARCHAR(10) DEFAULT '' ,
	mes7 VARCHAR(10) DEFAULT '' ,
	mes8 VARCHAR(10) DEFAULT '' ,
	mes9 VARCHAR(10) DEFAULT '' ,
	mes10 VARCHAR(10) DEFAULT '' ,
	mes11 VARCHAR(10) DEFAULT '' ,
	mes12 VARCHAR(10) DEFAULT '' ,
	FechaSistema DATETIME DEFAULT GETDATE()
); */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_entidades_consultados')
export class UatEqfxEntidadesConsultado {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_entidades_consultados: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'varchar', length: 255, default: '' })
	nombre_cliente: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes1: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes2: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes3: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes4: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes5: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes6: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes7: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes8: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes9: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes10: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes11: string;

	@Column({ type: 'varchar', length: 10, default: '' })
	mes12: string;

	@Column({ type: 'datetime', default: '' })
	FechaSistema: Date;
}
