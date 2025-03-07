import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
/*
CREATE TABLE [dbo].[Cre_Estado](
	[idEstado] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](10) NULL,
	[Estado] [varchar](100) NULL,
	[Activo] [bit] NULL,
*/
@Entity('Cre_Estado') // Explicitly setting the table name
export class CreEstado {

    @PrimaryGeneratedColumn('increment')
    idEstado: number;

    @Column('varchar', {
        length: 10,
        nullable: true
    })
    Codigo: string;

    @Column('varchar', {
        length: 100,
        nullable: true
    })
    Estado: string;

    @Column('bit', {
        nullable: true
    })
    Activo: boolean;
}
