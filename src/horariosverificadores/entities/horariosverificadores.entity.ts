import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('HorariosVerificador')
export class Horariosverificadores {
  @PrimaryGeneratedColumn()
  idHorariosVerificador: number;

  @Column()
  idVerificadorCredito: number;

  @Column()
  Dia: string;

  @Column()
  hora: number;

  @Column()
  Estado: string;

  @Column({ type: 'datetime' })
  FechaSistema: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Estacion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Usuario: string;

  @Column()
  idFechaVerificador: number; 

  @Column()
  iEstado: number;
}

