/* CREATE TABLE [dbo].[EQFX_CreditosOtorgados12UltimosMesesEducativo](
	[idEQFX_CreditosOtorgados12UltimosMesesEducativo] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[CodigoInstitucionInv] [varchar](10) NULL,
	[Institucion] [varchar](60) NULL,
	[EstadoOperacion] [varchar](40) NULL,
	[TipoCredito] [varchar](25) NULL,
	[ValorOperacion] [decimal](15, 2) NULL,
	[Titular] [decimal](15, 2) NULL,
	[Codeudor] [decimal](15, 2) NULL,
	[Garante] [decimal](15, 2) NULL,
	[FechaConcesion] [datetime] NULL,
	[FechaVencimiento] [datetime] NULL,
	[CodEstadoOpInv] [varchar](1) NULL,
	[CodTipoCreditoInv] [varchar](2) NULL,
	[CodTipoDeudorInv] [varchar](1) NULL,*/
    
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_CreditosOtorgados12UltimosMesesEducativo')
export class EqfxCreditosOtorg12UltMesEd {
    @PrimaryGeneratedColumn()
    idEQFX_CreditosOtorgados12UltimosMesesEducativo: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 10, nullable: true })
    CodigoInstitucionInv: string;

    @Column({ length: 60, nullable: true })
    Institucion: string;

    @Column({ length: 40, nullable: true })
    EstadoOperacion: string;

    @Column({ length: 25, nullable: true })
    TipoCredito: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    ValorOperacion: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Titular: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Codeudor: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    Garante: number;

    @Column({ type: 'datetime', nullable: true })
    FechaConcesion: Date;

    @Column({ type: 'datetime', nullable: true })
    FechaVencimiento: Date;

    @Column({ length: 1, nullable: true })
    CodEstadoOpInv: string;

    @Column({ length: 2, nullable: true })
    CodTipoCreditoInv: string;

    @Column({ length: 1, nullable: true })
    CodTipoDeudorInv: string;
}
