/*CREATE TABLE [dbo].[EQFX_PerfilRiesgoDirecto](
	[idEQFX_PerfilRiesgoDirecto] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[Indicador] [varchar](30) NULL,
	[Valor] [varchar](8000) NULL,
	[Fecha] [datetime] NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_PerfilRiesgoDirecto')
export class EqfxPerfilRiesgoDirec {
    @PrimaryGeneratedColumn()
    idEQFX_PerfilRiesgoDirecto: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 30, nullable: true })
    Indicador: string;

    @Column({ length: 8000, nullable: true })
    Valor: string;

    @Column({ type: 'datetime', nullable: true })
    Fecha: Date;
}
