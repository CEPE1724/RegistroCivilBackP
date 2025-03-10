/*
CREATE TABLE [dbo].[CRECTAEDOGESTION](
	[idEstadoGestns] [int] IDENTITY(1,1) NOT NULL,
	[CODIGO] [char](2) NULL,
	[DESCRIPCION] [varchar](50) NULL,
	[AUDITORIA] [varchar](250) NULL,
*/
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('CRECTAEDOGESTION')
export class Crectaedogestion {
    @PrimaryGeneratedColumn('increment')
    idEstadoGestns: number;

@Column('varchar', {
    length: 50,  
})
DESCRIPCION: string;

}
