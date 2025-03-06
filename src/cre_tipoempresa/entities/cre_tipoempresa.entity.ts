import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cre_TipoEmpresa')
export class CreTipoempresa {

	@PrimaryGeneratedColumn('increment')
	idTipoEmpresa: number;

	@Column({ type: 'varchar' })
    Descripción: string;

}
