// terrena-gestion-trabajo.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TerrenaGestionTrabajo')
export class TerrenaGestionTrabajo {
  @PrimaryGeneratedColumn()
  idTerrenaGestionTrabajo: number;

  @Column()
  idClienteVerificacion: number;

  @Column()
  idTerrenaTipoTrabajo: number;

  @Column()
  iTiempoTrabajo: number;

  @Column()
  iTiempoTrabajoYear: number;

  @Column('decimal', { precision: 18, scale: 2 })
  dIngresoTrabajo: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  DireccionesVisitada: string;

  @Column('float')
  Latitud: number;

  @Column('float')
  Longitud: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  trabajoImages: string;

  @Column('datetime')
  FechaSistema: Date;

  @Column({ type: 'varchar', length: 50 })
  Estacion: string;

  @Column({ type: 'varchar', length: 50 })
  Usuario: string;

  @Column({ type: 'varchar', length: 300 })
  CallePrincipal: string;

  @Column({ type: 'varchar', length: 300 })
  CalleSecundaria: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  ActividadTrabajo: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  TelefonoTrabajo: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  PuntoReferencia: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  PersonaEntrevistada: string;

  @Column({ type: 'int' })
  direccionCoincide: number;

  @Column({ type: 'int' })
  tipoVerificacion: number;
}
