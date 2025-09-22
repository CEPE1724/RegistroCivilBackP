import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CognoInfraccion } from './cognoInfraccion.entity';

@Entity("CognoDeudaEmov")
export class CognoDeudaEmov {
  @PrimaryGeneratedColumn('uuid')
  idDeudaEmov: string;

  @Column()
  idCognoSolicitudCredito: number;

  @Column({ length: 20 })
  cedula: string;

  @Column({ length: 50, nullable: true })
  tipo_busqueda: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valor_adeudado: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_actualizacion: Date;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  fecha_registro: Date;

  @OneToMany(() => CognoInfraccion, infraccion => infraccion.deudaEmov, { cascade: true })
  infracciones: CognoInfraccion[];
}
