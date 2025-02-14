// src/menusweb/menusweb.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('MenusWeb')
export class MenusWeb {
  @PrimaryGeneratedColumn()
  idMenusWeb: number;

  @Column({ type: 'varchar', length: 500 })
  Nombre: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  Url: string;

  @Column({ type: 'int', nullable: true })
  Menu_idMenusWeb: number;

  @Column({ type: 'int', default: 0 })
  Nivel: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  FechaSistema: Date;

  @Column({ type: 'varchar', length: 50, default: () => 'HOST_NAME()' })
  Estacion: string;

  @Column({ type: 'varchar', length: 50, default: () => 'SUSER_NAME()' })
  Usuario: string;
}
