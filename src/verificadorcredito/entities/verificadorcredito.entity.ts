import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('VerificadorCredito')
export class VerificadorCredito {
  @PrimaryGeneratedColumn({ name: 'idVerificadorCredito' })
  idVerificadorCredito: number;

  @Column({ name: 'Nombre', type: 'varchar', length: 255 })
  Nombre: string;

  @Column({ name: 'idUsuario', type: 'int' })
  idUsuario: number;

  @Column({ name: 'Fecha', type: 'datetime' })
  Fecha: Date;

  @Column({ name: 'Estado', type: 'int' })
  Estado: number;

  @Column({ name: 'Observaciones', type: 'varchar', length: 255, nullable: true })
  Observaciones: string;

  @CreateDateColumn({ name: 'FechaSistema', type: 'datetime' })
  FechaSistema: Date;

  @Column({ name: 'Estacion', type: 'varchar', length: 255 })
  Estacion: string;

  @Column({ name: 'Usuario', type: 'varchar', length: 255 })
  Usuario: string;
}
