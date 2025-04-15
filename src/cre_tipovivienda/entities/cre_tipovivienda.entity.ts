
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
@Entity('Cre_TipoVivienda')
export class CreTipovivienda {
	@PrimaryGeneratedColumn('increment')
    idTipoVivienda: number;

	@Column({ type: 'varchar', length: 70, nullable: true })
	Nombre: string;
}
