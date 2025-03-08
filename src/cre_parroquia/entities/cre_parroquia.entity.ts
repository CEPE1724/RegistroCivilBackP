/*
CREATE TABLE [dbo].[Cre_Parroquia](
	[idParroquia] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](6) NULL,
	[Nombre] [varchar](70) NULL,
	[idCanton] [int] NULL,
	[idZona] [int] NULL,
	[idParroquiaCooP] [int] NULL,
	[idCantonCoop] [int] NULL,
	[Banco] [int] NULL,
	[BancoAust] [int] NULL,
*/

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Cre_Parroquia') // Explicitly setting the table name
export class CreParroquia {

    @PrimaryGeneratedColumn('increment')
    idProvincia: number;

    @Column('varchar', {
        length: 70,
        nullable: true
    })
    Nombre: string;

    @Column('int', {
        nullable: true
    })
    idCanton: number;
}
