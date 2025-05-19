/*CREATE TABLE CognoSolicitudNacionalidades (
    idCognoSolicitudNacionalidades INT IDENTITY(1,1) PRIMARY KEY,
    idCognoSolicitudCredito INT,
    idPais INT,
    nombre VARCHAR(200),
    codigoArea VARCHAR(10),
    codigoIso2 VARCHAR(5),
    codigoIso3 VARCHAR(5),
    codigoIso INT,
    /* auditoria
    FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME()
);*/

import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity('CognoSolicitudNacionalidades')
export class CognoSolicitudNacionalidades {
    @PrimaryGeneratedColumn('increment')
    idCognoSolicitudNacionalidades: number;
    
    @Column('text', {
        default: ''
    })
    idCognoSolicitudCredito: string;
     
    @Column('int')
    idPais: number;


    @Column('varchar', {
        length: 200
    })
    nombre: string;

    @Column('varchar', {
        length: 10
    })
    codigoArea: string;

    @Column('varchar', {
        length: 5
    })
    codigoIso2: string;

    @Column('varchar', {
        length: 5
    })
    codigoIso3: string;


    @Column('int')
    codigoIso: number;  



}