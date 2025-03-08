import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cre_Canton')
export class CreCiudadinmueble {

	@PrimaryGeneratedColumn('increment')
	idCanton: number;

	@Column('varchar', {
		length: 70,
		nullable: true
	})
	Nombre: string;
}
