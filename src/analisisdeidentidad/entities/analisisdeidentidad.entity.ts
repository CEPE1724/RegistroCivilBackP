/*CREATE TABLE AnalisisDeIdentidad (
    idAnalisisDeIdentidad UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    codigo VARCHAR(255) DEFAULT '',
    identificacion VARCHAR(15) DEFAULT '',
    url VARCHAR(500) DEFAULT '',
    short_url VARCHAR(255) DEFAULT '',
    valido_hasta DATETIME NOT NULL,
    Usuario VARCHAR(50) DEFAULT '',
    idCre_SolicitudWeb int default 0 ,
	codigo_interno VARCHAR(500) DEFAULT '',
    idEstadoAnalisisDeIdentidad INT DEFAULT 0,
    FechaSistema DATETIME DEFAULT GETDATE(),
    Mensaje varchar(500) default '', 
    FechaRespuesta DATETIME 
);
*/

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('AnalisisDeIdentidad')  // Explicitly setting the table name
export class Analisisdeidentidad {
    @PrimaryGeneratedColumn('uuid', { name: 'idAnalisisDeIdentidad' })
    idAnalisisDeIdentidad: string;
    @Column({ default: '' })
    codigo: string
    @Column({ length: 15, default: '' })
    identificacion: string
    @Column({ length: 500, default: '' })
    url: string
    @Column({ length: 255, default: '' })
    short_url: string
    @Column({ type: 'datetime' })
    valido_hasta: Date
    @Column({ length: 50, default: '' })
    Usuario: string
    @Column({ type: 'int', name: 'idCre_SolicitudWeb', default: 0 })
    idCre_SolicitudWeb: number
    @Column({ length: 500, name: 'codigo_interno', default: '' })
    codigo_interno: string
    @Column({ type: 'int', name: 'idEstadoAnalisisDeIdentidad', default: 0 })
    idEstadoAnalisisDeIdentidad: number
    @Column({ name: 'FechaSistema', default: () => 'CURRENT_TIMESTAMP' })
    FechaSistema: Date
    @Column({ length: 500, default: '' })
    Mensaje: string
    @Column({ type: 'datetime', nullable: true })
    FechaRespuesta: Date | null;
    @Column({ type: 'varchar', length: 1000, nullable: true })
    sCreSolicitudWeb: string 
}

