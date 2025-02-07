import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('HistoricoRC')
export class Historico {
  @Column({ type: 'int' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  usuario: string;

  @Column({ type: 'int' })
  idUsuario: number;

  @Column({ type: 'varchar', length: 255 })
  cedulaConsultada: string;

  @Column({ type: 'int', default: 0 })
  cantidadConsultas: number;

  @CreateDateColumn({ type: 'datetime2' })
  fechaConsulta: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ip: string;

  @Column({ type: 'bit', default: 0 })
  apiRC: boolean;
}
