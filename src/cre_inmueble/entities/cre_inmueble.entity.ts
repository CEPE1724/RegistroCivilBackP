import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cre_Inmueble')
export class CreInmueble {
	@PrimaryGeneratedColumn('increment')
	idInmueble: number;

	@Column('varchar', {
		length: 70,
		nullable: true
	})
	Nombre: string;
}
