/*CREATE TABLE [dbo].[EQFX_EvolucionHistoricaDistEndeudamiento](
	[idEQFX_EvolucionHistoricaDistEndeudamiento] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[FechaCorte] [datetime] NULL,
	[Institucion] [varchar](60) NULL,
	[PorVencer] [decimal](15, 2) NULL,
	[Vencido] [decimal](15, 2) NULL,
	[NoDevengaInt] [decimal](15, 2) NULL,
	[SaldoDeuda] [decimal](15, 2) NULL,
	[DemandaJudicial] [decimal](15, 2) NULL,
	[CarteraCastigada] [decimal](15, 2) NULL,
	[CodigoInstitucionParam] [decimal](15, 2) NULL,
	[AcuerdoConcordatorio] [char](1) NULL,
	[InstitucionParam] [varchar](60) NULL, */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_EvolucionHistoricaDistEndeudamiento')
export class EqfxEvolucionHistDisEndeudamiento {
    @PrimaryGeneratedColumn()
    idEQFX_EvolucionHistoricaDistEndeudamiento: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ type: 'datetime', nullable: true })
    FechaCorte: Date;

    @Column({ length: 60, nullable: true })
    Institucion: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    PorVencer: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Vencido: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    NoDevengaInt: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    SaldoDeuda: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    DemandaJudicial: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    CarteraCastigada: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    CodigoInstitucionParam: number; 

    @Column({ length: 1, nullable: true })
    AcuerdoConcordatorio: string; 

    @Column({ length: 60, nullable: true })
    InstitucionParam: string; 
}
