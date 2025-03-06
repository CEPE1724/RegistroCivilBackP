import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_Profesion')
export class CreProfesion {

	
	@PrimaryGeneratedColumn('increment')
	idProfesion: number;

	@Column({ type: 'varchar', length: 5 })
    Nombre: string;

	@Column({ type: 'varchar' })
    Codigo: string;

	@Column({ type: 'int' })
    Codigo_BA: number;


}
