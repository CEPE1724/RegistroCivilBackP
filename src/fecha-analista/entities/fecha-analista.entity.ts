/*CREATE TABLE FechaAnalista (
  idFechaAnalista INT IDENTITY(1,1) PRIMARY KEY,
  Desde DATETIME,
    Hasta DATETIME
)
*/

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FechaAnalista')
export class FechaAnalista {
    @PrimaryGeneratedColumn()
    idFechaAnalista: number;
    
    @Column()
    Desde: Date;
    
    @Column()
    Hasta: Date;
    
}
