/*CREATE TABLE [dbo].[EQFX_EvolucionHistoricaDistEndeudamientoRecursivo](
	[idEQFX_EvolucionHistoricaDistEndeudamientoRecursivo] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[FechaCorte] [datetime] NULL,
	[FechaCorteParam] [datetime] NULL,
	[PorVencer] [decimal](15, 2) NULL,
	[NoDevengaInt] [decimal](15, 2) NULL,
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
	[SaldoDeuda] [decimal](15, 2) NULL,
	[tipoDeudaParam] [varchar](10) NULL, */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_EvolucionHistoricaDistEndeudamientoRecursivo')
export class EqfxEvolucionHistDisEndRecursivo {
    @PrimaryGeneratedColumn()
    idEQFX_EvolucionHistoricaDistEndeudamientoRecursivo: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ type: 'datetime', nullable: true })
    FechaCorte: Date;

    @Column({ type: 'datetime', nullable: true })
    FechaCorteParam: Date;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    PorVencer: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    NoDevengaInt: number;

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
    Vencido12a24:number; 

    @Column({ type:'decimal', precision :15 , scale :2 ,nullable:true})
    Vencido24:number; 

    @Column({ type:'decimal', precision :15 , scale :2 ,nullable:true})
    Vencido36:number; 

    @Column({ type:'decimal', precision :15 , scale :2 ,nullable:true})
    DemandaJudicial:number; 

    @Column({ type:'decimal', precision :15 , scale :2 ,nullable:true})
    CarteraCastigada:number; 

    @Column({ type:'decimal', precision :15 , scale :2 ,nullable:true})
    SaldoDeuda:number;

    @Column({ length: 10, nullable: true })
    tipoDeudaParam: string;
}
