/*CREATE  TABLE HorariosAnaliSta (
    idHorariosAnaliSta INT IDENTITY(1,1) PRIMARY KEY,
    idAnalistaCredito INT,
    Hora  INT,
	Dia varchar (50),
    Estado VARCHAR(50) DEFAULT 'Inactive',
	iEstado INT DEFAULT 0,
	Fecha DATETIME,
	idFechaAnalista INT DEFAULT 0,
)
*/
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('HorariosAnaliSta')
export class Horariosanalista {
    @PrimaryGeneratedColumn()
    idHorariosAnaliSta: number;
    
    @Column()
    idAnalistaCredito: number;
    
    @Column()
    Hora: number;
    
    @Column()
    Dia: string;
    
    @Column()
    Estado: string;
    
    @Column()
    iEstado: number;
    
    @Column()
    Fecha: Date;
    
    @Column()
    idFechaAnalista: number;
    
}
