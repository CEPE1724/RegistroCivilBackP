import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_TipoSueldo')
export class CreTiposueldo {
	
	@PrimaryGeneratedColumn('increment')
	idTipoSueldo: number;

	@Column({ type: 'varchar' })
	Nombre: string;
}
