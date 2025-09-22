import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { CognoDeudaEmov } from './cognoDeudaEmov.entity';
import { CognoDetalleRubro } from './cognoDetalleRubro.entity';

@Entity("CognoInfraccion")
export class CognoInfraccion {
  @PrimaryGeneratedColumn('uuid')
  id_infraccion: string;

  @Column()
  idDeudaEmov: string;

  @Column({ length: 100, nullable: true })
  rubro: string;

  @Column({ length: 500, nullable: true })
  detalle: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  fecha_registro: Date;

  @ManyToOne(() => CognoDeudaEmov, deuda => deuda.infracciones)
  @JoinColumn({ name: 'idDeudaEmov' })
  deudaEmov: CognoDeudaEmov;

  @OneToOne(() => CognoDetalleRubro, detalle => detalle.infraccion, { cascade: true })
  detalleRubro: CognoDetalleRubro;
}
