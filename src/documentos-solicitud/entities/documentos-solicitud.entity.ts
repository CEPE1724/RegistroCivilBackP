
/**
 CREATE   TABLE  DocumentosSolicitudWeb (
    idDocumentosSolicitudWeb INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único del documento
    idCre_SolicitudWeb INT, -- Relacionado con la solicitud
    idTipoDocumentoWEB INT DEFAULT 0, -- Tipo de documento (Ej. DNI, Comprobante de ingresos, etc.)
    RutaDocumento VARCHAR(500), -- Ruta o ubicación del archivo en el sistema
    idEstadoDocumento INT DEFAULT 1,
    FechaSubida DATETIME DEFAULT GETDATE(),
    FechaAprobacion DATETIME, -- Fecha en que el documento fue aprobado o rechazado
	Usuario VARCHAR(50) DEFAULT SUSER_NAME()
);
 */


import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('DocumentosSolicitudWeb')
export class DocumentosSolicitud {
    @PrimaryGeneratedColumn()
    idDocumentosSolicitudWeb: number;

    @Column({ type: 'int', nullable: true })
    idCre_SolicitudWeb: string;

    @Column({ type: 'int', nullable: true })
    idTipoDocumentoWEB: number;

    @Column({ type: 'nvarchar', length: 500, nullable: true })
    RutaDocumento: string;

    @Column({ type: 'int', nullable: true })
    idEstadoDocumento: number;

    @Column({ type: 'datetime', nullable: true })
    FechaSubida: Date;

    @Column({ type: 'datetime', nullable: true })
    FechaAprobacion: Date;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    Usuario: string;
} 

