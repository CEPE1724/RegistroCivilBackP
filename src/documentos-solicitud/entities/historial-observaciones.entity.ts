import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
/*
CREATE  TABLE HistorialObservaciones (
    idHistorialObservaciones INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único de la observación
    idCre_SolicitudWeb INT, -- Relacionado con la solicitud
    idDocumentosSolicitudWeb INT, -- Relacionado con el documento, si aplica
    idUsuario INT, -- Identificador del usuario que realiza la observación (solicitante o aprobador)
    Observacion TEXT, -- Texto de la observación
    Fecha DATETIME, -- Fecha de la observación
    TipoUsuario VARCHAR(50), -- Tipo de usuario (Ej. Solicitante, Aprobador)
	FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME()
);


*/
@Entity('HistorialObservaciones')
export class HistorialObservaciones {
    @PrimaryGeneratedColumn()
    idHistorialObservaciones: number;

    @Column({ type: 'int', nullable: false })
    idCre_SolicitudWeb: string;

    @Column({ type: 'int', nullable: true })
    idDocumentosSolicitudWeb: number;

    @Column({ type: 'int', nullable: false })
    idUsuario: number;

    @Column({ type: 'text', nullable: false })
    Observacion: string;

    @Column({ type: 'datetime', nullable: false })
    Fecha: Date;

    @Column({ type: 'int'})
    TipoUsuario: number;

    @Column({ type: 'datetime', default: () => 'GETDATE()' })
    FechaSistema: Date;

    @Column({ type: 'varchar', length: 50, default: () => "HOST_NAME()" })
    Estacion: string;

    @Column({ type: 'varchar', length: 50, default: () => "SUSER_NAME()" })
    Usuario: string;

    @Column({ type: 'int', nullable: true })
    idTipoDocumentoWEB: number;

}