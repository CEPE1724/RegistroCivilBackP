import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_TipoContrato')
export class CreTipocontrato {
	
	@PrimaryGeneratedColumn('increment')
	idTipoContrato: number;

	@Column({ type: 'varchar' })
	Nombre: string;

}
