/*CREATE TABLE [dbo].[EQFX_DetalleDeudaActualReportadaSBS](
    [idEQFX_DetalleDeudaActualReportadaSBS] [int] IDENTITY(1,1) NOT NULL,
    [idEQFX_IdentificacionConsultada] [int] NULL,
    [Institucion] [varchar](200) NULL,
    [FechaCorte] [varchar](10) NULL,
    [TipoRiesgo] [varchar](60) NULL,
    [TipoCredito] [varchar](25) NULL,
    [CupoMontoOriginal] [decimal](15, 2) NULL,
    [FechaApertura] [varchar](10) NULL,
    [FechaVencimiento] [varchar](10) NULL,
    [CalifPropia] [varchar](1) NULL,
    [TotalVencer] [decimal](15, 2) NULL,
    [NDI] [decimal](15, 2) NULL,
    [TotalVencido] [decimal](15, 2) NULL,
    [DemJud] [decimal](15, 2) NULL,
    [CartCast] [decimal](15, 2) NULL,
    [SaldoDeuda] [decimal](15, 2) NULL,
    [CuotaMensual] [decimal](15, 2) NULL,
    [FechaSistema] [datetime] NULL,
    [Estacion] [varchar](50) NULL,
    [Usuario] [varchar](50) NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_DetalleDeudaActualReportadaSBS')
export class EqfxDetalleDeudaAct {
    @PrimaryGeneratedColumn()
    idEQFX_DetalleDeudaActualReportadaSBS: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 200, nullable: true })
    Institucion: string;

    @Column({ length: 10, nullable: true })
    FechaCorte: string;

    @Column({ length: 60, nullable: true })
    TipoRiesgo: string;

    @Column({ length: 25, nullable: true })
    TipoCredito: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    CupoMontoOriginal: number;

    @Column({ length: 10, nullable: true })
    FechaApertura: string;

    @Column({ length: 10, nullable: true })
    FechaVencimiento: string;

    @Column({ length: 1, nullable: true })
    CalifPropia: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    TotalVencer: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    NDI: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    TotalVencido: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    DemJud: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    CartCast: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    SaldoDeuda: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    CuotaMensual: number;

    @Column({ type: 'datetime', nullable: true })
    FechaSistema: Date;

    @Column({ length: 50, nullable: true })
    Estacion: string;

    @Column({ length: 50, nullable: true })
    Usuario: string;

}
