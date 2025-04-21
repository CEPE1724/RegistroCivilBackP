import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FechaVerificador')
export class FechaVerificador {
	@PrimaryGeneratedColumn()
	idFechaAnalista: number;
	
	@Column()
	Desde: Date;
	
	@Column()
	Hasta: Date;
	
}
