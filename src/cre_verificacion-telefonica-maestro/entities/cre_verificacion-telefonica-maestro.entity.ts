/*  
CREATE TABLE Cre_VerificacionTelefonicaMaestro (
    idCre_VerificacionTelefonicaMaestro INT IDENTITY(1,1) PRIMARY KEY,
    Fecha  DATETIME DEFAULT  GETDATE(),
	Telefono varchar (15) default '',
	idEstadoOrigenTelefonica int default 0,
	idCre_SolicitudWeb int default 0,
    idWeb_SolicitudGrande int default 0,
	  FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME() 
	)




*/

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cre_VerificacionTelefonicaMaestro')
export class CreVerificacionTelefonicaMaestro {

    @PrimaryGeneratedColumn()
    idCre_VerificacionTelefonicaMaestro: number;
    
    @Column()
    Fecha: Date;
    
    @Column()
    Telefono: string;
    
    @Column()
    idEstadoOrigenTelefonica: number;
    
    @Column()
    idCre_SolicitudWeb: number;
    
    @Column()
    idWeb_SolicitudGrande: number;
    
    @Column()
    FechaSistema: Date;
    
    @Column()
    Estacion: string;
    
    @Column()
    Usuario: string;

    @Column()
    idEstadoGestns: number;

    @Column()
    Observacion: string;

}
