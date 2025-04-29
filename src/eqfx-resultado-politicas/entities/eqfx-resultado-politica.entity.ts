/*
CREATE TABLE [dbo].[EQFX_ResultadoPoliticas](
	[idEQFX_ResultadoPoliticas] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[Politica] [varchar](250) NULL,
	[Valor] [varchar](250) NULL,
	[Resultado] [varchar](250) NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL, */
    
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_ResultadoPoliticas')
export class EqfxResultadoPolitica {
    @PrimaryGeneratedColumn()
    idEQFX_ResultadoPoliticas: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 250, nullable: true })
    Politica: string;

    @Column({ length: 250, nullable: true })
    Valor: string;

    @Column({ length: 250, nullable: true })
    Resultado: string;

    @Column({ type: 'datetime', nullable: true })
    FechaSistema: Date;

    @Column({ length: 50, nullable: true })
    Estacion: string;

    @Column({ length: 50, nullable: true })
    Usuario: string;
}
