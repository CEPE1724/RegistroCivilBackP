/*  
CREATE TABLE [dbo].[Cre_Canton](
	[idCanton] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](4) NULL,
	[Nombre] [varchar](50) NULL,
	[CodCiudad] [varchar](3) NULL,
	[idProvincia] [int] NULL,
	[idProvinciaCooP] [int] NULL,
	[idCiudadCooP] [int] NULL,
	[idCantonCoop] [int] NULL,
	[Banco] [int] NULL,
	[BancoAust] [int] NULL,

*/

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Cre_Canton') // Explicitly setting the table name
export class CreCanton {

    @PrimaryGeneratedColumn('increment')
    idCanton: number;


    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Nombre: string;

    @Column('int', {
        nullable: true
    })
    idProvincia: number;

}
