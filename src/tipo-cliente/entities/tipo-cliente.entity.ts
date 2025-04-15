/*
CREATE TABLE [dbo].[TipoCliente](
	[idTipoCliente] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NULL,
*/

import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity("TipoCliente")
export class TipoCliente {

    @PrimaryGeneratedColumn()
    idTipoCliente: number;

    @Column('varchar', {
        length: 100,
        nullable: true
    })
    Nombre: string;


}





