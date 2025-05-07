/*CREATE TABLE [dbo].[EQFX_DeudaReportadaRFR](
	[idEQFX_DeudaReportadaRFR] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[Institucion] [varchar](200) NULL,
	[Calificacion] [varchar](1) NULL,
	[PorVencer] [decimal](15, 2) NULL,
	[NoDevengaInt] [decimal](15, 2) NULL,
	[Vencido] [decimal](15, 2) NULL,
	[DemandaJudicial] [decimal](15, 2) NULL,
	[CarteraCastigada] [decimal](15, 2) NULL,
	[Total] [decimal](15, 2) NULL, */ 

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_DeudaReportadaRFR')
export class EqfxDeudaReportadaRfr {
    @PrimaryGeneratedColumn()
    idEQFX_DeudaReportadaRFR: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 200, nullable: true })
    Institucion: string;

    @Column({ length: 1, nullable: true })
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
}
