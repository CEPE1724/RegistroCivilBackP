/*CREATE TABLE [dbo].[EQFX_DetalleOperacionesVencidas](
	[idEQFX_DetalleOperacionesVencidas] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[Titulo] [varchar](200) NULL,
	[Vencido0a1] [decimal](15, 2) NULL,
	[Vencido1a2] [decimal](15, 2) NULL,
	[Vencido2a3] [decimal](15, 2) NULL,
	[Vencido3a6] [decimal](15, 2) NULL,
	[Vencido6a9] [decimal](15, 2) NULL,
	[Vencido9a12] [decimal](15, 2) NULL,
	[Vencido12a24] [decimal](15, 2) NULL,
	[Vencido24] [decimal](15, 2) NULL,
	[Vencido36] [decimal](15, 2) NULL,
	[DemandaJudicial] [decimal](15, 2) NULL,
	[CarteraCastigada] [decimal](15, 2) NULL,
	[Total] [decimal](15, 2) NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_DetalleOperacionesVencidas')
export class EqfxDetalleOperacionesVenc {
    @PrimaryGeneratedColumn()
    idEQFX_DetalleOperacionesVencidas: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 200, nullable: true })
    Titulo: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Vencido0a1: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Vencido1a2: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Vencido2a3: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Vencido3a6: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Vencido6a9: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Vencido9a12: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Vencido12a24: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Vencido24: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Vencido36: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    DemandaJudicial: number; 

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    CarteraCastigada: number; 

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Total: number;
}
