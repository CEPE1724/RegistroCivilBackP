/*
CREATE TABLE [dbo].[DispositivosAPP](
	[idDispositivosAPP] [int] IDENTITY(1,1) NOT NULL,
	[idNomina] [int] NULL,
	[idCom_Estado] [int] NULL,
	[Empresa] [int] NULL,
	[Activo] [int] NULL,
	[Cedula] [varchar](20) NULL,
	[KeyDispositivo] [varchar](500) NULL,
	[idTipoPersonal] [int] NULL,
	[Pin] [char](6) NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL,
	[iContActivacion] [int] NULL,
	[PinSeguridad] [varchar](10) NULL,
	[UsuarioAPP] [varchar](50) NULL,
	[TokenExpo] [varchar](500) NULL, */ 

import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Nomina } from 'src/nomina/entities/nomina.entity';
import { IngresoCobrador } from 'src/ingreso-cobrador/entities/ingreso-cobrador.entity';

@Entity('DispositivosAPP')
export class DispositivosApp {
	@PrimaryGeneratedColumn()
	idDispositivosAPP: number;

	@Column({ type: 'int', nullable: true })
	idNomina: number;

	@Column({ type: 'int', nullable: true })
	idCom_Estado: number;

	@Column({ type: 'int', nullable: true })
	Empresa: number;

	@Column({ type: 'int', nullable: true })
	Activo: number;

	@Column({ length: 20, nullable: true })
	Cedula: string;

	@Column({ length: 500, nullable: true })
	KeyDispositivo: string;

	@Column({ type: 'int', nullable: true })
	idTipoPersonal: number;

	@Column({ length: 6, nullable: true })
	Pin: string;

	@Column({ type: 'datetime', nullable: true })
	FechaSistema: Date;

	@Column({ length: 50, nullable: true })
	Estacion: string;

	@Column({ length: 50, nullable: true })
	Usuario: string;

	@Column({ type: 'int', nullable: true })
	iContActivacion: number;

	@Column({ length: 10, nullable: true })
	PinSeguridad?: string;

	@Column({ length: 50, nullable: true })
	UsuarioAPP?: string;

	@Column({ length: 500, nullable: true })
	TokenExpo?: string;

	// Relación con Nomina (cuando la Empresa es 1)
  @ManyToOne(() => Nomina, (nomina) => nomina.idNomina)
  @JoinColumn({ name: 'idNomina', referencedColumnName: 'idNomina' })
  nomina: Nomina;

  // Relación con IngresoCobrador (cuando la Empresa es 33)
  @ManyToOne(() => IngresoCobrador, (ingresoCobrador) => ingresoCobrador.idIngresoCobrador)
  @JoinColumn({ name: 'idNomina', referencedColumnName: 'idIngresoCobrador' })
  ingresoCobrador: IngresoCobrador;
}
