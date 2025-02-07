import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cbo_Gestores') // Nombre de la tabla en la base de datos
export class CboGestores {
  @PrimaryGeneratedColumn()
  idCbo_Gestores: number;

  @Column({ length: 100, nullable: true })
  Gestor: string;

  @Column({ type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  FechaSistema: Date;

  @Column({ length: 60, nullable: true, default: () => 'suser_sname()' })
  Usuario: string;
}
