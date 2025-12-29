import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Cre_EntidadFinanciera' })
export class CreEntidadFinanciera {
	@PrimaryGeneratedColumn({ name: 'idEntidadFinanciera' })
	idEntidadFinanciera: number;

	@Column({ name: 'Nombre', type: 'varchar', length: 70, nullable: true })
	Nombre?: string;


	@Column({ name: 'Cobranza', type: 'bit', default: () => '0', nullable: true, select: false })
	Cobranza?: boolean;
}
