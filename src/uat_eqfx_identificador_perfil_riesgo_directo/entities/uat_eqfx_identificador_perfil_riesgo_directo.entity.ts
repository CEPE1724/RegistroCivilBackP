/*CREATE TABLE EQFX_UAT_identificador_perfil_riesgo_directo (
	idEQFX_UAT_identificador_perfil_riesgo_directo INT IDENTITY(1,1) PRIMARY KEY,
	idEQFX_IdentificacionConsultada INT NOT NULL,
	indicador VARCHAR(255) DEFAULT '' ,
	valor VARCHAR(255) DEFAULT '' ,
	fecha DATE NULL,
	FechaSistema DATETIME DEFAULT GETDATE()
); */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_UAT_identificador_perfil_riesgo_directo')
export class UatEqfxIdentificadorPerfilRiesgoDirecto {
	@PrimaryGeneratedColumn()
	idEQFX_UAT_identificador_perfil_riesgo_directo: number;

	@Column({ type: 'int' })
	idEQFX_IdentificacionConsultada: number;

	@Column({ type: 'varchar', length: 255, default: '' })
	indicador: string;

	@Column({ type: 'varchar', length: 255, default: '' })
	valor: string;

	@Column({ type: 'date', nullable: true })
	fecha: Date | null;

	@Column({ type: 'datetime', name: 'FechaSistema', default: '' })
	FechaSistema: Date;
}
