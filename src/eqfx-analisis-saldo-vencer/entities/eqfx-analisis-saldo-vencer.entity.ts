/*CREATE TABLE [dbo].[EQFX_AnalisisSaldosPorVencerSistemaFinanciero](
	[idEQFX_AnalisisSaldosPorVencerSistemaFinanciero] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[FechaCorte] [datetime] NULL,
	[Institucion] [varchar](60) NULL,
	[TotalPorVencer] [decimal](15, 2) NULL,
	[PorVencer0a1] [decimal](15, 2) NULL,
	[PorVencer1a3] [decimal](15, 2) NULL,
	[PorVencer3a6] [decimal](15, 2) NULL,
	[PorVencer6a12] [decimal](15, 2) NULL,
	[PorVencer12] [decimal](15, 2) NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL, */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_AnalisisSaldosPorVencerSistemaFinanciero')
export class EqfxAnalisisSaldoVencer {
    @PrimaryGeneratedColumn()
    idEQFX_AnalisisSaldosPorVencerSistemaFinanciero: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ type: 'datetime', nullable: true })
    FechaCorte: Date;

    @Column({ length: 60, nullable: true })
    Institucion: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    TotalPorVencer: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    PorVencer0a1: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    PorVencer1a3: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    PorVencer3a6: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    PorVencer6a12: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    PorVencer12: number;
}
