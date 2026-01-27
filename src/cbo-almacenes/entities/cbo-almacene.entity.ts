/*/*CREATE TABLE [dbo].[Cbo_Almacenes](
    [idCbo_Almacenes] [int] IDENTITY(1,1) NOT NULL,
    [idCbo_Scores_Cobranzas] [int] NULL,
    [Bodega] [int] NULL,
    [idCbo_Riesgos] [int] NULL,
    [Puntaje] [int] NULL,
    [sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,*/

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Bodega } from 'src/Bodega/bodega.entity';
import { CboRiesgoestado} from 'src/cbo-riesgo/entities/cbo-riesgo.entity';
@Entity({ name: 'Cbo_Almacenes' })
export class CboAlmacenes {
    @PrimaryGeneratedColumn({ name: 'idCbo_Almacenes' })
    idCbo_Almacenes: number;

    @Column({ name: 'idCbo_Scores_Cobranzas', type: 'int', nullable: true })
    idCbo_Scores_Cobranzas?: number;

    @Column({ name: 'Bodega', type: 'int', nullable: true })
    Bodega?: number;

    @ManyToOne(() => Bodega, { eager: true })
    @JoinColumn({ name: 'Bodega', referencedColumnName: 'Bodega' })
    bodegaData?: Bodega;

    @Column({ name: 'idCbo_Riesgos', type: 'int', nullable: true })
    idCbo_Riesgos?: number;

    @ManyToOne(() => CboRiesgoestado, { eager: true })
    @JoinColumn({ name: 'idCbo_Riesgos', referencedColumnName: 'idCbo_Riesgo' })
    cboRiesgoData?: CboRiesgoestado;

    @Column({ name: 'Puntaje', type: 'int', nullable: true })
    Puntaje?: number;

    @Column({ name: 'sCbo_Scores_Cobranzas', type: 'uniqueidentifier', nullable: true })
    sCbo_Scores_Cobranzas?: string;
}
