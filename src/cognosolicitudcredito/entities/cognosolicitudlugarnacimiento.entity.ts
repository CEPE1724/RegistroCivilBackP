
/*
CREATE TABLE CognoSolicitudLugarNacimiento  (
    idCognoSolicitudLugarNacimiento INT IDENTITY(1,1) PRIMARY KEY,
    idCognoSolicitudCredito INT,
    idLugar INT,
    codigoPostal VARCHAR(20),
    fechaActualizacion DATE,
    idPais INT,
    Pais VARCHAR(200),
    codigoAreaPais VARCHAR(10),
    codigoIso2 VARCHAR(5),
    codigoIso3 VARCHAR(5),
    codigoIso INT,
    idProvincia INT,
    Provincia VARCHAR(200),
    codigoAreaProvincia VARCHAR(10),
    idCanton INT,
    Canton VARCHAR(200),
    idParroquia INT,
    Parroquia VARCHAR(200),
    Tipo int default 0,
    FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME()

);*/

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('CognoSolicitudLugarNacimiento')
export class CognoSolicitudLugarNacimiento {
    @PrimaryGeneratedColumn('increment')
    idCognoSolicitudLugarNacimiento: number;

    @Column('int', {
        default: 0
    })
    idCognoSolicitudCredito: number;

    
