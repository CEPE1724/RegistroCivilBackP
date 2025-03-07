import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
/* 
CREATE TABLE [dbo].[TipoTrabajo](
	[idTipoTrabajo] [int] IDENTITY(1,1) NOT NULL,
	[Tipo] [varchar](100) NULL,
*/

@Entity('TipoTrabajo')
export class TipoTrabajo {

    @PrimaryGeneratedColumn('increment')
    idTipoTrabajo : number;

    @Column('varchar',{
        length:100,
        nullable: true
    })
    Tipo: String


}
