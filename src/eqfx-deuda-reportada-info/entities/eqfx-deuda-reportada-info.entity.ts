/*CREATE TABLE [dbo].[EQFX_DeudaReportadaINFOCOM](
	[idEQFX_DeudaReportadaINFOCOM] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[Institucion] [varchar](200) NULL,
	[FechaCorte] [datetime] NULL,
	[TipoDeudor] [varchar](15) NULL,
	[Total] [decimal](15, 2) NULL,
	[PorVencer] [decimal](15, 2) NULL,
	[NoDevengaInt] [decimal](15, 2) NULL,
	[Vencido] [decimal](15, 2) NULL,
	[DemandaJudicial] [decimal](15, 2) NULL,
	[CarteraCastigada] [decimal](15, 2) NULL,
	[DiasVencido] [int] NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_DeudaReportadaINFOCOM')
export class EqfxDeudaReportadaInfo {
    @PrimaryGeneratedColumn()
    idEQFX_DeudaReportadaINFOCOM: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 200, nullable: true })
    Institucion: string;

    @Column({ type: 'datetime', nullable: true })
    FechaCorte: Date;

    @Column({ length: 15, nullable: true })
    TipoDeudor: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Total: number;

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

    @Column({ type: 'int', nullable: true })
    DiasVencido: number;
}
