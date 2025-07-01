// info-sistema.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('InfoSistemas2')
export class InfoSistema {
  @PrimaryGeneratedColumn()
  idInfoSistema: number;

  @Column({ type: 'datetime' })
  Fecha: Date;

  @Column({ type: 'varchar', length: 50 })
  DireccionIP: string;

  @Column({ type: 'varchar', length: 50 })
  Usuario: string;

  @Column({ type: 'datetime' })
  FechaSistema: Date;

  @Column({ type: 'varchar', length: 50 })
  Estacion: string;

  @Column({ type: 'varchar', length: 50 })
  Versionamiento: string;
}
