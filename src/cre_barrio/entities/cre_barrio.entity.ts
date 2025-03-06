/*
CREATE TABLE [dbo].[Cre_Barrio](
	[idBarrio] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](9) NULL,
	[Nombre] [varchar](70) NULL,
	[idParroquia] [int] NULL,
	[idZona] [int] NULL,
*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Cre_Barrio') // Explicitly setting the table name
export class CreBarrio {
    
    @PrimaryGeneratedColumn('increment')
    idBarrio: number;

    @Column('varchar', {
        length: 70,
        nullable: true
    })
    Nombre: string;

    @Column('int', {
        nullable: true
    })
    idParroquia: number;
}
