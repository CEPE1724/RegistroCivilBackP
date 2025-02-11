/*
CREATE TABLE [dbo].[Cbo_EstadosGestion](
	[idCbo_EstadoGestion] [int] IDENTITY(1,1) NOT NULL,
	[Estado] [varchar](30) NULL,
	[Activo] [bit] NULL,*/

    import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
    @Entity('Cbo_EstadosGestion')
    export class Cbo_EstadosGestionEntity {
        @PrimaryGeneratedColumn()
        idCbo_EstadoGestion: number;
        @Column()
        Estado: string;
        @Column()
        Activo: boolean;
    }    