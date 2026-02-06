/*CREATE TABLE [dbo].[Cre_GCTelefono](
	[idCre_GCTelefono] [int] IDENTITY(1,1) NOT NULL,
	[idCliente] [int] NULL,
	[Telefono] [varchar](20) NULL,
	[Descripcion] [varchar](100) NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL,*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Cre_GCTelefono') // Explicitly setting the table name
export class CreGcTelefono {
    @PrimaryGeneratedColumn('increment')
    idCre_GCTelefono: number;

    @Column('int', {
        nullable: true
    })
    idCliente: number;

    @Column('varchar', {
        length: 20,
        nullable: true
    })
    Telefono: string;

    @Column('varchar', {
        length: 100,
        nullable: true
    })
    Descripcion: string;

    @Column('datetime', {
        nullable: true
    })
    FechaSistema: Date;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Estacion: string;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Usuario: string;
}

