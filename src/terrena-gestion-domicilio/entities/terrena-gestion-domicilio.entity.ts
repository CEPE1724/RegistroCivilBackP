// terrena-gestion-domicilio.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TerrenaGestionDomicilio')
export class TerrenaGestionDomicilio {
  @PrimaryGeneratedColumn()
  idTerrenaGestionDomicilio: number;

  @Column()
  idClienteVerificacion: number;

  @Column()
  idTerrenaTipoCliente: number;

  @Column()
  iTiempoVivienda: number;

  @Column()
  idTerrenaTipoVivienda: number;

  @Column()
  idTerrenaEstadoVivienda: number;

  @Column()
  idTerrenaZonaVivienda: number;

  @Column()
  idTerrenaPropiedad: number;

  @Column()
  idTerrenaAcceso: number;

  @Column()
  idTerrenaCobertura: number;

  @Column({ type: 'varchar', length: 500 })
  PuntoReferencia: string;

  @Column({ type: 'varchar', length: 300 })
  PersonaEntrevistada: string;

  @Column({ type: 'varchar', length: 500 })
  Observaciones: string;

  @Column({ type: 'varchar', length: 300 })
  VecinoEntreVisto: string;

  @Column({ type: 'varchar', length: 500 })
  DireccionesVisitada: string;

  @Column({ type: 'float' })
  Latitud: number;

  @Column({ type: 'float' })
  Longitud: number;

  @Column({ type: 'text' })
  domicilioImages: string;

  @Column({ type: 'text' })
  trabajoImages: string;

  @Column({ type: 'datetime' })
  FechaSistema: Date;

  @Column({ type: 'varchar', length: 50 })
  Estacion: string;

  @Column({ type: 'varchar', length: 50 })
  Usuario: string;

  @Column({ type: 'varchar', length: 300 })
  CallePrincipal: string;

  @Column({ type: 'varchar', length: 300 })
  CalleSecundaria: string;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  ValorArrendado: number;
}