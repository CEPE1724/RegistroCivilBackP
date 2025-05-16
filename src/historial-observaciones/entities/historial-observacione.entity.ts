/* 
CREATE TABLE [dbo].[HistorialObservaciones](
	[idHistorialObservaciones] [int] IDENTITY(1,1) NOT NULL,
	[idCre_SolicitudWeb] [int] NULL,
	[idDocumentosSolicitudWeb] [int] NULL,
	[idUsuario] [int] NULL,
	[Observacion] [text] NULL,
	[Fecha] [datetime] NULL,
	[TipoUsuario] [int] NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL,
	[idTipoDocumentoWEB] [int] NULL,
*/
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('HistorialObservaciones')
export class HistorialObservaciones {
    @PrimaryGeneratedColumn()
    idHistorialObservaciones: number;

    @Column({ type: 'int' })
    idCre_SolicitudWeb: string;

    @Column({ type: 'int' })
    idDocumentosSolicitudWeb: number;

    @Column({ type: 'int', nullable: true })
    idUsuario: number;

    @Column({ type: 'text' })
    Observacion: string;

    @Column({ type: 'datetime' })
    Fecha: Date;

    @Column({ type: 'int' })
    TipoUsuario: number;

    @Column({ type: 'datetime' })
    FechaSistema: Date;

    @Column({ type: 'varchar', length: 50, nullable: true })
    Estacion: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    Usuario: string;

    @Column({ type: 'int' })
    idTipoDocumentoWEB: number;
}