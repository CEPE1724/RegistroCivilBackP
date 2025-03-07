/*
CREATE TABLE [dbo].[Cre_NegadoPendiente](
	[idNegadoPendiente] [int] IDENTITY(1,1) NOT NULL,
	[CodigoNP] [varchar](1) NULL,
	[Codigo] [varchar](5) NULL,
	[Nombre] [varchar](50) NULL,
	[idEstado] [int] NULL,
	[idMotivo] [int] NULL,
*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Cre_NegadoPendiente') // Explicitly setting the table name
export class EstadoSolicitud {
   
    @PrimaryGeneratedColumn('increment')
    idNegadoPendiente: number;

    @Column('varchar', {
        length: 1,
        nullable: true
    })
    CodigoNP: string;

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

    @Column('int', {
        nullable: true
    })
    idEstado: number;

    @Column('int', {
        nullable: true
    })
    idMotivo: number;

}
