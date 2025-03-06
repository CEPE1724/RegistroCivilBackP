import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_NivelEducacion')
export class CreNiveleducacion {

	@PrimaryGeneratedColumn('increment')
	idNivelEducacion: number;

	@Column({ type: 'varchar', length: 5 })
    Nombre: string;

	@Column({ type: 'int' })
    CodPichincha: number;

	@Column({ type: 'int' })
    Codigo_BA: number;

}

