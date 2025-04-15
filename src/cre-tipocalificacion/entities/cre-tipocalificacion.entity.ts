/*
CREATE TABLE [dbo].[Cre_TipoCalificacion](
	[idTipoCalificacion] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](5) NULL,
	[Nombre] [varchar](50) NULL,
*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cre_TipoCalificacion') // Explicitly setting the table name
export class CreTipocalificacion {

    @PrimaryGeneratedColumn('increment')
    idTipoCalificacion: number;

    @Column('varchar', {
        length: 5,
        nullable: true
    })
    Codigo: string;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Nombre: string;
}
