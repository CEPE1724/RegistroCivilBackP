/*CREATE TABLE [dbo].[EQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores](
	[idEQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfr] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[FechaCorte] [varchar](10) NULL,
	[Segmento] [varchar](20) NULL,
	[Institucion] [varchar](200) NULL,
	[TipoRiesgo] [varchar](20) NULL,
	[TipoCredito] [varchar](20) NULL,
	[Calificacion] [varchar](1) NULL,
	[MayorValorVencido] [decimal](15, 2) NULL,
	[FechaMayorValor] [varchar](10) NULL,
	[MayorPlazoVencido] [varchar](20) NULL,
	[FechaMayorPlazo] [varchar](10) NULL,
	[FechaUltimoVencido] [varchar](10) NULL,
	[Operacion] [varchar](20) NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL, */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores')
export class EqfxIndicadoresDeudaHistorica {
    @PrimaryGeneratedColumn()
    idEQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfr: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 10, nullable: true })
    FechaCorte: string;

    @Column({ length: 20, nullable: true })
    Segmento: string;

    @Column({ length: 200, nullable: true })
    Institucion: string;

    @Column({ length: 20, nullable: true })
    TipoRiesgo: string;

    @Column({ length: 20, nullable: true })
    TipoCredito: string;

    @Column({ length: 1, nullable: true })
    Calificacion: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    MayorValorVencido: number;

    @Column({ length: 10, nullable: true })
    FechaMayorValor: string;

    @Column({ length: 20, nullable: true })
    MayorPlazoVencido: string;

    @Column({ length: 10, nullable: true })
    FechaMayorPlazo: string;

    @Column({ length: 10, nullable: true })
    FechaUltimoVencido: string;

    @Column({ length: 20, nullable: true })
    Operacion: string;
}
