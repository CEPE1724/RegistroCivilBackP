/*CREATE TABLE [dbo].[EQFX_CalificaDetalleTarjetas](
	[idEQFX_CalificaDetalleTarjetas] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[Institucion] [varchar](60) NULL,
	[Emisor] [varchar](30) NULL,
	[Antiguedad] [int] NULL,
	[Cupo] [decimal](15, 2) NULL,
	[SaldoActual] [decimal](15, 2) NULL,
	[SaldoPromedioUltimos6Meses] [decimal](15, 2) NULL,
	[PorcentajeUsoTarjeta] [decimal](15, 2) NULL,
	[PorcentajeRelacionDeudaTCDeudaTotal] [decimal](15, 2) NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL, */
    
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_CalificaDetalleTarjetas')
export class EqfxCalificaDetalleTarj {
    @PrimaryGeneratedColumn()
    idEQFX_CalificaDetalleTarjetas: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 60, nullable: true })
    Institucion: string;

    @Column({ length: 30, nullable: true })
    Emisor: string;

    @Column({ type: 'int', nullable: true })
    Antiguedad: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Cupo: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    SaldoActual: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    SaldoPromedioUltimos6Meses: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    PorcentajeUsoTarjeta: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    PorcentajeRelacionDeudaTCDeudaTotal: number;
}
