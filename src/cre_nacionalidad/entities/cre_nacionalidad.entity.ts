import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cre_Nacionalidad') 
export class CreNacionalidad {

	@PrimaryGeneratedColumn('increment')
	idNacionalidad: number;

	@Column('varchar', {
        length: 70,
        nullable: true
    })
    Nombre: string;
}
