// src/cbo-gestor/cbo-gestor-cobranzas.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cbo_Gestor_Cobranzas') // Nombre de la tabla en la base de datos
export class CboGestorCobranzas {
  @PrimaryGeneratedColumn()
  idCbo_Gestor_Cobranzas: number;

  @Column({ nullable: true })
  idCompra: number;

  @Column({ nullable: true })
  idCbo_Gestores: number;

  @Column({ nullable: true })
  Bodega: number;

  @Column({ nullable: true })
  idCbo_Gestores_Estrategia: number;

  @Column({ nullable: true })
  idGestor: number;

  @Column({ length: 10, nullable: true })
  Cedula: string;

  @Column({ length: 200, nullable: true })
  Cliente: string;

  @Column({ length: 20, nullable: true })
  Documento: string;

  @Column({ length: 100, nullable: true })
  Cartera: string;

  @Column({ length: 200, nullable: true })
  Direccion: string;

  @Column({ length: 8000, nullable: true })
  Referencia: string;

  @Column({ length: 100, nullable: true })
  Barrio: string;

  @Column({ length: 12, nullable: true })
  Celular: string;

  @Column({ nullable: true })
  Cuota: number;

  @Column({ type: 'date', nullable: true })
  Vence: string;

  @Column({ nullable: true })
  CuotasVencidas: number;

  @Column({ nullable: true })
  CuotasPendientes: number;

  @Column({ nullable: true })
  DiasMora: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  ValorCuotas: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  Mora: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  Gastos: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  SaldoVencido: number;

  @Column({ type: 'datetime', nullable: true })
  FechaSistema: Date;

  @Column({ length: 60, nullable: true })
  Usuario: string;
}
