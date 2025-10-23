/*
CREATE TABLE [dbo].[Cliente](
	[idCliente] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](200) NULL,
	[Direccion] [varchar](650) NULL,
	[Telefono] [varchar](50) NULL,
	[Ruc] [varchar](50) NULL,
	[Celular] [varchar](50) NULL,
	[Proveedor] [bit] NOT NULL,
*/ 

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cliente')
export class Cliente {

	@PrimaryGeneratedColumn()
	idCliente: number;
	
	@Column({ type: 'varchar', length: 200 })
	Nombre: string;
	
	@Column({ type: 'varchar', length: 650, nullable: true })
	Direccion: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	Telefono: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	Ruc: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	Celular: string;
	
	@Column({ type: 'bit', default: false })
	Proveedor: boolean;
}
