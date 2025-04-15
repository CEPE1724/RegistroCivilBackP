

/*
  CREATE TABLE CognoTrabajoCargo (
    idCognoTrabajoCargo INT IDENTITY(1,1) PRIMARY KEY,
    idCargo INT,
    NombreCargo VARCHAR(200),
    FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME()
)
    */
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity('CognoTrabajoCargo')  // Explicitly setting the table name
export class Cognotrabajocargo {
    @PrimaryGeneratedColumn('increment')
    idCognoTrabajoCargo: number;

    @Column('varchar', {
        length: 200,
        default: ''
    })
    NombreCargo: string;

  
}
