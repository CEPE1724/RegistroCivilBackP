/*CREATE TABLE CognoSolicitudProfesiones (
    idCognoSolicitudProfesiones INT IDENTITY(1,1) PRIMARY KEY,
    idCognoSolicitudCredito INT,
    idProfesion INT,
    descripcion VARCHAR(200),
    /* auditoria
    FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME()
);
*/

import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity('CognoSolicitudProfesiones')
export class CognoSolicitudProfesiones {
    @PrimaryGeneratedColumn('increment')
    idCognoSolicitudProfesiones: number;
    
    @Column('int', {
        default: 0
    })
    idCognoSolicitudCredito: number;
     
    @Column('int')
    idProfesion: number;

    @Column('varchar', {
        length: 200
    })
    descripcion: string;


}


