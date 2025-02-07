// src/cbo-gestores/cbo-gestores-estrategia.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cbo_Gestores_Estrategia') // Nombre de la tabla en la base de datos
export class CboGestoresEstrategia {
  @PrimaryGeneratedColumn()
  idCbo_Gestores_Estrategia: number;

  @Column({ type: 'date', nullable: true })
  Inicio: string;

  @Column({ type: 'date', nullable: true })
  Fin: string;

  @Column({ nullable: true })
  idCbo_Gestores: number;

  @Column({ length: 300, nullable: true })
  Estrategia: string;

  @Column({ nullable: true })
  Gestion: number;

  @Column({ nullable: true })
  Dias_Mora_Inicia: number;

  @Column({ nullable: true })
  Dias_Mora_Finaliza: number;

  @Column({ type: 'datetime', nullable: true })
  FechaSistema: Date;

  @Column({ length: 60, nullable: true })
  Usuario: string;
}
