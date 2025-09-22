import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';


@Entity("CognoIssfacCertMedico")
export class CognoIssfacCertMedico {
  @PrimaryGeneratedColumn('uuid')
  idCognoIssfacCertMedico: string;

  @Column()
  idCognoSolicitudCredito: number;

  @Column({ length: 20 })
  cedula: string;

  @Column({ length: 200 })
  nombre: string;

  @Column({ length: 50 })
  edad: string;

  @Column({ length: 300 })
  categoria: string;

  @Column({ length: 20 })
  cobertura: string;

  @Column({ type: 'datetime' })
  fechaActualizacion: Date;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  fecha_registro: Date;
}
