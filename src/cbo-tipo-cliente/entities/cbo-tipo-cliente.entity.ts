/*CREATE TABLE [dbo].[Cbo_TiposCliente](
	[idCbo_TiposCliente] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_Scores_Cobranzas] [int] NULL,
	[idTipoCliente] [int] NULL,
	[idCbo_Riesgo] [int] NULL,
	[Puntaje] [int] NULL,
	[sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,
 CONSTRAINT [PK__Cbo_Tipo__682CCBE5DC9B3B2E] PRIMARY KEY CLUSTERED */

import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import {TipoCliente} from '../../tipo-cliente/entities/tipo-cliente.entity';
import { CboRiesgoestado} from 'src/cbo-riesgo/entities/cbo-riesgo.entity';
@Entity({ name: 'Cbo_TiposCliente' })

export class CboTipoCliente {
    @PrimaryGeneratedColumn({ name: 'idCbo_TiposCliente' })
    idCbo_TiposCliente: number;

    @Column({ name: 'idCbo_Scores_Cobranzas', type: 'int', nullable: true })
    idCbo_Scores_Cobranzas?: number;

    @Column({ name: 'idTipoCliente', type: 'int', nullable: true })
    idTipoCliente?: number;

     @ManyToOne(() => TipoCliente, { eager: true })
    @JoinColumn({ name: 'idTipoCliente', referencedColumnName: 'idTipoCliente' })
    tipoCliente?: TipoCliente;

    @ManyToOne(() => CboRiesgoestado, { eager: true })
    @JoinColumn({ name: 'idCbo_Riesgo', referencedColumnName: 'idCbo_Riesgo' })
    cboRiesgoData?: CboRiesgoestado;

    @Column({ name: 'idCbo_Riesgo', type: 'int', nullable: true })
    idCbo_Riesgo?: number;

    @Column({ name: 'Puntaje', type: 'int', nullable: true })
    Puntaje?: number;

    @Column({ name: 'sCbo_Scores_Cobranzas', type: 'uniqueidentifier', nullable: true })
    sCbo_Scores_Cobranzas?: string;
}
