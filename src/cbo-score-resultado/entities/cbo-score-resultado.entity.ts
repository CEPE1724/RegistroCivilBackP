/*CREATE TABLE [dbo].[Cbo_Score_Resultado](
	[idCbo_Score_Resultado] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_Scores_Cobranzas] [int] NULL,
	[Desde] [int] NULL,
	[Hasta] [int] NULL,
	[Peso] [decimal](18, 2) NULL,
	[Resultado] [decimal](18, 2) NULL,
	[idCbo_Riesgo] [int] NULL,
	[sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,*/
    import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
    import { CboRiesgoestado } from 'src/cbo-riesgo/entities/cbo-riesgo.entity';
import { Col } from 'sequelize/types/utils';
    @Entity({ name: 'Cbo_Score_Resultado' })
export class CboScoreResultado {
    @PrimaryGeneratedColumn({ name: 'idCbo_Score_Resultado' })
    idCbo_Score_Resultado: number;

    @Column({ name: 'idCbo_Scores_Cobranzas', type: 'int', nullable: true })
    idCbo_Scores_Cobranzas?: number;

    @Column({ name: 'Desde', type: 'int', nullable: true })
    Desde?: number;

    @Column({ name: 'Hasta', type: 'int', nullable: true })
    Hasta?: number;

    @Column({ name: 'Peso', type: 'decimal', precision: 18, scale: 2, nullable: true })
    Peso?: number;

    @Column({ name: 'Resultado', type: 'decimal', precision: 18, scale: 2, nullable: true })
    Resultado?: number;

    @Column({ name: 'idCbo_Riesgo', type: 'int', nullable: true })
    idCbo_Riesgo?: number;

    @Column({ name: 'sCbo_Scores_Cobranzas', type: 'uniqueidentifier', nullable: true })
    sCbo_Scores_Cobranzas?: string;

    @ManyToOne(() => CboRiesgoestado, { eager: true })
    @JoinColumn({ name: 'idCbo_Riesgo', referencedColumnName: 'idCbo_Riesgo' })
    cboRiesgoData?: CboRiesgoestado;
}
