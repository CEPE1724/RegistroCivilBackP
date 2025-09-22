import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CognoInfraccion } from './cognoInfraccion.entity';

@Entity("CognoDetalleRubro")
export class CognoDetalleRubro {
  @PrimaryGeneratedColumn('uuid')
  id_detalle: string;

  @Column()
  id_infraccion: string;

  @Column({ length: 10, nullable: true })
  placa: string;

  @Column({ length: 20, nullable: true })
  fecha: string;

  @Column({ length: 20, nullable: true })
  hora: string;

  @Column({ length: 300, nullable: true })
  lugar: string;

  @Column({ type: 'text', nullable: true })
  articulo: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorRubro: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorInteres: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorIva: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalRubro: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  fecha_registro: Date;

  @OneToOne(() => CognoInfraccion, infraccion => infraccion.detalleRubro)
  @JoinColumn({ name: 'id_infraccion' })
  infraccion: CognoInfraccion;
}
