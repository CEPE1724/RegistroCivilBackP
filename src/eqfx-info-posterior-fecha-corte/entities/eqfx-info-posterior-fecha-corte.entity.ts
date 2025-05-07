/*CREATE TABLE [dbo].[EQFX_InformacionPosteriorFechaCorteOperacionesCanceladas](
	[idEQFX_InformacionPosteriorFechaCorteOperacionesCanceladas] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[FechaCorte] [datetime] NULL,
	[Institucion] [varchar](60) NULL,
	[NumeroOperacion] [varchar](22) NULL,
	[FechaCancelacion] [datetime] NULL, */ 
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EQFX_InformacionPosteriorFechaCorteOperacionesCanceladas')
export class EqfxInfoPosteriorFechaCorte {
    @PrimaryGeneratedColumn()
    idEQFX_InformacionPosteriorFechaCorteOperacionesCanceladas: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ type: 'datetime', nullable: true })
    FechaCorte: Date;

    @Column({ length: 60, nullable: true })
    Institucion: string;

    @Column({ length: 22, nullable: true })
    NumeroOperacion: string;

    @Column({ type: 'datetime', nullable: true })
    FechaCancelacion: Date;
}
