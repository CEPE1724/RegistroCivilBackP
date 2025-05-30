/*
CREATE TABLE [dbo].[Cre_VerificacionTelefonica](
	[idCre_VerificacionTelefonica] [int] IDENTITY(1,1) NOT NULL,
	[ClienteGarante] [bit] NULL,
	[Origen] [int] NULL,
	[idCre_Solicitud] [int] NULL,
	[Fecha] [datetime] NULL,
	[Telefono] [varchar](20) NULL,
	[Contacto] [varchar](100) NULL,
	[idParentesco] [int] NULL,
	[idEstadoGestns] [int] NULL,
	[Observaciones] [varchar](1000) NULL,
	[Estado] [bit] NULL,
	[NotasDelSistema] [varchar](100) NULL,
	[Usuario] [varchar](50) NULL,
	[Indice] [int] NULL,
	[Web] [int] NULL,*/
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_VerificacionTelefonica')
export class Creverificaciontelefonica {
   
    @PrimaryGeneratedColumn('increment')
    idCre_VerificacionTelefonica: number;
    
    @Column({ type: 'bit', nullable: true })
    ClienteGarante: boolean;
    
    @Column({ type: 'int', nullable: true })
    Origen: number;
    
    @Column({ type: 'int', nullable: true })
    idCre_Solicitud: number;
    
    @Column({ type: 'datetime', nullable: true })
    Fecha: Date;
    
    @Column({ type: 'varchar', length: 20, nullable: true })
    Telefono: string;
    
    @Column({ type: 'varchar', length: 100, nullable: true })
    Contacto: string;
    
    @Column({ type: 'int', nullable: true })
    idParentesco: number;
    
    @Column({ type: 'int', nullable: true })
    idEstadoGestns: number;
    
    @Column({ type: 'varchar', length: 1000, nullable: true })
    Observaciones: string;
    
    @Column({ type: 'bit', nullable: true })
    Estado: boolean;
    
    @Column({ type: 'varchar', length: 100, nullable: true })
    NotasDelSistema: string;
    
    @Column({ type: 'varchar', length: 50, nullable: true })
    Usuario: string;
    
    @Column({ type: 'int', nullable: true })
    Indice: number;
    
    @Column({ type: 'int', nullable: true })
    Web: number;


}
