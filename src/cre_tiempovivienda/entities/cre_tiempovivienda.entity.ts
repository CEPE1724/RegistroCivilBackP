import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity('Cre_Tiempo')
export class CreTiempovivienda {
	@PrimaryGeneratedColumn('increment')
    idCre_Tiempo: number;

	@Column({ type: 'varchar', length: 70, nullable: true })
	Descripcion: string;
}
