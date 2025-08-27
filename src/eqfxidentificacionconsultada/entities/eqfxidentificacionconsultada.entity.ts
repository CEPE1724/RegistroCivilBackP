/*Create Table EQFX_IdentificacionConsultada
(
    idEQFX_IdentificacionConsultada INT IDENTITY(1,1) PRIMARY KEY,
    NombreSujeto VARCHAR(200),
    TipoDocumento CHAR(1),
    NumeroDocumento CHAR(10),
    FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME()
);*/
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('EQFX_IdentificacionConsultada')
export class Eqfxidentificacionconsultada {

    @PrimaryGeneratedColumn()
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 200 })
    NombreSujeto: string;

    @Column({ length: 1 })
    TipoDocumento: string;

    @Column({ length: 10 })
    NumeroDocumento: string;

    @Column({ type: 'datetime', default: () => 'GETDATE()' })
    FechaSistema: Date;

    @Column({ length: 50, default: () => 'HOST_NAME()' })
    Estacion: string;

    @Column({ length: 50, default: () => 'SUSER_NAME()' })
    Usuario: string;

    @Column({ type: 'int', nullable: true })
    UAT: number;

}
