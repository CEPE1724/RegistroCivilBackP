
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'Cbo_Riesgo' })

export class CboRiesgoestado {
    @PrimaryGeneratedColumn({ name: 'idCbo_Riesgo' })
    idCbo_Riesgo: number;

    @Column({ name: 'Riesgo', type: 'varchar', length: 50, nullable: true })
    Riesgo?: string;
}
