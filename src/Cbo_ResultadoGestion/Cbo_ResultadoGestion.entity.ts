/* 
CREATE TABLE [dbo].[Cbo_ResultadoGestion](
	[idCbo_ResultadoGestion] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_EstadoGestion] [int] NULL,
	[Resultado] [varchar](100) NULL,
	[idCbo_EstadosTipocontacto] [int] NULL,
*/

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Cbo_ResultadoGestion') 
export class Cbo_ResultadoGestionEntity {
    @PrimaryGeneratedColumn()
    idCbo_ResultadoGestion: number;
    @Column()
    Resultado: string;
    @Column()
    idCbo_EstadosTipocontacto: number;
}
