import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';



/*
CREATE TABLE [dbo].[Cre_Provincia](
	[idProvincia] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](20) NULL,
	[Nombre] [varchar](200) NULL,
	[Prefijo] [varchar](50) NULL,
	[idProvinciaCooP] [int] NULL,
	[Banco] [int] NULL,
	[BancoAust] [int] NULL,
*/


@Entity('Cre_Provincia') // Explicitly setting the table name
export class CreProvincia {

    @PrimaryGeneratedColumn('increment')
    idProvincia: number;

    @Column('varchar', {
        length: 20,
        nullable: true
    })
    Codigo: string;

    @Column('varchar', {
        length: 200,
        nullable: true
    })
    Nombre: string;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Prefijo: string;

    @Column('int', {
        nullable: true
    })
    idProvinciaCooP: number;

    @Column('int', {
        nullable: true
    })
    Banco: number;

    @Column('int', {
        nullable: true
    })
    BancoAust: number;
}
