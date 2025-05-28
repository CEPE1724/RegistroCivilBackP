import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ListaNegraCedula')
export class ListaNegraCedula {
  
  @PrimaryGeneratedColumn({ name: 'idListaNegraCedula' })
  idListaNegraCedula: number;

  @Column({ name: 'Cedula', type: 'varchar', length: 20, nullable: true })
  Cedula: string;

  @Column({ name: 'Observacion', type: 'varchar', length: 255, nullable: true })
  Observacion: string;

  @Column({ name: 'Activo', type: 'bit', nullable: true })
  Activo: boolean;

  @Column({ name: 'FechaSistema', type: 'datetime', nullable: true })
  FechaSistema: Date;

  @Column({ name: 'Estacion', type: 'varchar', length: 50, nullable: true })
  Estacion: string;

  @Column({ name: 'Usuario', type: 'varchar', length: 50, nullable: true })
  Usuario: string;
}
