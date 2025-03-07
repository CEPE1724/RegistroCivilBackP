import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_Cargo')
export class CreCargo {
	
	@PrimaryGeneratedColumn('increment')
	idCargo: number;

	@Column({ type: 'varchar' })
	Nombre: string;

}
