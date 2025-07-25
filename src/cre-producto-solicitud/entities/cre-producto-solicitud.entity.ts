import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cre_ProductoSolicitud')
export class CreProductoSolicitud {
  @PrimaryGeneratedColumn()
  idCre_ProductoSolicitud: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  Producto: string;

  @Column({ type: 'bit', nullable: true })
  Estado: boolean;
}
