/*
CREATE TABLE [dbo].[EQFX_ResultadoSegmentacion](
	[idEQFX_ResultadoSegmentacion] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[ResultadoEvaluacion] [int] NULL,
	[SegmentacionCliente] [varchar](250) NULL,
	[Ingresos] [decimal](15, 2) NULL,
	[GastoHogar] [decimal](15, 2) NULL,
	[GastoFinanciero] [decimal](15, 2) NULL,
	[RangoIngresos] [varchar](250) NULL,
	[CapacidaddePago] [decimal](15, 2) NULL,
	[Edad] [int] NULL,
	[ModeloUtilizado] [varchar](250) NULL,
	[ScoreTitular] [varchar](250) NULL,
	[ScoreSobreendeudamiento] [varchar](250) NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL,*/

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('EQFX_ResultadoSegmentacion')
export class EqfxResultadoSegmentacion {
    @PrimaryGeneratedColumn()
    idEQFX_ResultadoSegmentacion: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ type: 'int', nullable: true })
    ResultadoEvaluacion: number;

    @Column({ length: 250, nullable: true })
    SegmentacionCliente: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Ingresos: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    GastoHogar: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    GastoFinanciero: number;

    @Column({ length: 250, nullable: true })
    RangoIngresos: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    CapacidaddePago: number;

    @Column({ type: 'int', nullable: true })
    Edad: number;

    @Column({ length: 250, nullable: true })
    ModeloUtilizado: string;

    @Column({ length: 250, nullable: true })
    ScoreTitular: string;

    @Column({ length: 250, nullable: true })
    ScoreSobreendeudamiento: string;

    @Column({ type: 'datetime', default: () => 'GETDATE()', nullable: true })
    FechaSistema?: Date;

    @Column({ length: 50, default: () => 'HOST_NAME()', nullable: true })
    Estacion?: string;

    @Column({ length: 50, default: () => 'SUSER_NAME()', nullable: true })
    Usuario?: string;
}
