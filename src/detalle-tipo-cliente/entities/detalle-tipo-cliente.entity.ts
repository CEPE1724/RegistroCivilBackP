import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
/*  

CREATE TABLE [dbo].[DetalleTipoCliente](
	[idDetalleTipoCliente] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NULL,
	[Activo] [bit] NULL,


*/
@Entity('DetalleTipoCliente') // Explicitly setting the table name
export class DetalleTipoCliente {

    @PrimaryGeneratedColumn('increment')
    idDetalleTipoCliente: number;

    @Column('varchar', {
        length: 100,
        nullable: true
    })
    Nombre: string;

    @Column('bit', {
        nullable: true
    })
    Activo: boolean;
}
