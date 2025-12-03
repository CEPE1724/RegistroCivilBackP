import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Almacenes')
export class Almacen {
  @PrimaryGeneratedColumn({ name: 'idAlmacenes' })
  idAlmacenes: number;

  @Column({ type: 'int', nullable: true })
  Bodega: number;

  @Column({ type: 'int', nullable: true })
  Credito: number;

  @Column({ type: 'varchar', length: 3, nullable: true })
  Codigo: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  Nombre: string;

  @Column({ type: 'int', nullable: true })
  CrediDigital: number;
}
