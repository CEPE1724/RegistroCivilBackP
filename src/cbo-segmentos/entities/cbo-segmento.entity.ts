/*CREATE TABLE [dbo].[Cbo_Segmentos](
	[idCbo_Segmento] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_Scores_Cobranzas] [int] NULL,
	[Segmento] [varchar](60) NULL,
	[Participacion] [decimal](18, 2) NULL,
	[FechaSistema] [datetime] NULL,
	[Usuario] [varchar](30) NULL,
	[sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'Cbo_Segmentos' })
export class CboSegmento {
    @PrimaryGeneratedColumn({ name: 'idCbo_Segmento' })
    idCbo_Segmento: number;

    @Column({ name: 'idCbo_Scores_Cobranzas', type: 'int', nullable: true })
    idCbo_Scores_Cobranzas?: number;

    @Column({ name: 'Segmento', type: 'varchar', length: 60, nullable: true })
    Segmento?: string;

    @Column({ name: 'Participacion', type: 'decimal', precision: 18, scale: 2, nullable: true })
    Participacion?: number;


    @Column({ name: 'sCbo_Scores_Cobranzas', type: 'uniqueidentifier', nullable: true })
    sCbo_Scores_Cobranzas?: string;
}
