/*
CREATE TABLE [dbo].[RolesWeb](
	[idRolesWeb] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](255) NOT NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL,*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('RolesWeb') // Explicitly setting the table name
export class Rolesweb {

    @PrimaryGeneratedColumn('increment')
    idRolesWeb: number;

    @Column('nvarchar', {
        length: 255,
        nullable: false
    })
    Nombre: string;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Usuario: string;

}
