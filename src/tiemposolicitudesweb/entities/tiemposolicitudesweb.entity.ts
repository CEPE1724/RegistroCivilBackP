/*
CREATE TABLE [dbo].[TiempoSolicitudesWeb](
	[idTiempoSolicitudesWeb] [int] IDENTITY(1,1) NOT NULL,
	[idEstadoVerificacionDocumental] [int] NULL,
	[idCre_SolicitudWeb] [int] NULL,
	[Tipo] [int] NULL,
	[Usuario] [varchar](50) NULL,
	[FechaSistema] [datetime] NULL,*/
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity('TiempoSolicitudesWeb')  // Explicitly setting the table name
export class TiempoSolicitudesWeb {

    @PrimaryGeneratedColumn({ name: 'idTiempoSolicitudesWeb' })
    idTiempoSolicitudesWeb: number;

    @Column({ name: 'idEstadoVerificacionDocumental', type: 'int', nullable: true })
    idEstadoVerificacionDocumental: number;

    @Column({ name: 'idCre_SolicitudWeb', type: 'int', nullable: true })
    idCre_SolicitudWeb: number;

    @Column({ name: 'Tipo', type: 'int', nullable: true })
    Tipo: number;

    @Column({ name: 'Usuario', type: 'varchar', length: 50, nullable: true })
    Usuario: string;

    @Column({ name: 'FechaSistema', type: 'datetime', nullable: true })
    FechaSistema: Date;
}
