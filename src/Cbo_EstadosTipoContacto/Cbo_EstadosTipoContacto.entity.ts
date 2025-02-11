/*
CREATE TABLE [dbo].[Cbo_EstadosTipocontacto](
	[idCbo_EstadosTipocontacto] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_EstadoGestion] [int] NULL,
	[Estado] [varchar](300) NULL,
	[Activo] [bit] NULL,
*/

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Cbo_EstadosTipocontacto')
export class Cbo_EstadosTipoContactoEntity {
	@PrimaryGeneratedColumn()
	idCbo_EstadosTipocontacto: number;
	@Column()
	idCbo_EstadoGestion: number;
	@Column()
	Estado: string;
	@Column()
	Activo: boolean;
}