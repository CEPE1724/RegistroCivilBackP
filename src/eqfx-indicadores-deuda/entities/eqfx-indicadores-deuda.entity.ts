/* CREATE TABLE [dbo].[EQFX_IndicadoresDeudaActualSbsSicomRfr](
	[idEQFX_IndicadoresDeudaActualSbsSicomRfr] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[FechaCorte] [varchar](10) NULL,
	[Segmento] [varchar](20) NULL,
	[Institucion] [varchar](200) NULL,
	[TipoDeudor] [varchar](20) NULL,
	[TipoCredito] [varchar](20) NULL,
	[Calificacion] [varchar](20) NULL,
	[PorVencer] [decimal](15, 2) NULL,
	[NoDevengaInt] [decimal](15, 2) NULL,
	[Vencido] [decimal](15, 2) NULL,
	[DemandaJudicial] [decimal](15, 2) NULL,
	[CarteraCastigada] [decimal](15, 2) NULL,
	[Total] [decimal](15, 2) NULL,
	[DiasVencido] [varchar](50) NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_IndicadoresDeudaActualSbsSicomRfr')
export class EqfxIndicadoresDeuda {
    @PrimaryGeneratedColumn()
    idEQFX_IndicadoresDeudaActualSbsSicomRfr: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 10, nullable: true })
    FechaCorte: string;

    @Column({ length: 20, nullable: true })
    Segmento: string;

    @Column({ length: 200, nullable: true })
    Institucion: string;

    @Column({ length: 20, nullable: true })
    TipoDeudor: string;

    @Column({ length: 20, nullable: true })
    TipoCredito: string;

    @Column({ length: 20, nullable: true })
    Calificacion: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    PorVencer: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    NoDevengaInt: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Vencido: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    DemandaJudicial: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    CarteraCastigada: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Total: number;

    @Column({ length: 50, nullable: true })
    DiasVencido: string;
}
