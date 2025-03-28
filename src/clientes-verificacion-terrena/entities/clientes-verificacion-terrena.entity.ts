import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ClientesVerificionTerrena')
export class ClientesVerificacionTerrena {
  @PrimaryGeneratedColumn()
  idClienteVerificacion: number;

  @Column({ type: 'varchar', nullable: true })
  Numero?: string;

  @Column({ type: 'int', nullable: true })
  idCre_solicitud?: number;

  @Column({ type: 'int', nullable: true })
  idCre_DatosGenerales?: number;

  @Column({ type: 'varchar', nullable: true })
  Ruc?: string;

  @Column({ type: 'varchar', nullable: true })
  Nombres?: string;

  @Column({ type: 'varchar', nullable: true })
  Celular?: string;

  @Column({ type: 'int', nullable: true })
  idVerificador?: number;

  @Column({ type: 'int', nullable: true })
  iEstado?: number;

  @Column({ type: 'int', nullable: true })
  Bodega?: number;

  @Column({ type: 'varchar', nullable: true })
  Almacen?: string;

  @Column({ type: 'bit', nullable: true })
  bDomicilio?: boolean;

  @Column({ type: 'bit', nullable: true })
  bTrabajo?: boolean;

  @Column({ type: 'bit', nullable: true })
  bDomicilioVerifica?: boolean;

  @Column({ type: 'bit', nullable: true })
  bTrabajoVerifica?: boolean;

  @Column({ type: 'int', nullable: true })
  idTerrenaGestionDomicilio?: number;

  @Column({ type: 'int', nullable: true })
  idTerrenaGestionTrabajo?: number;

  @Column({ type: 'varchar', nullable: true })
  DireccionDomicilio?: string;

  @Column({ type: 'varchar', nullable: true })
  DireccionTrabajo?: string;

  @Column({ type: 'datetime', nullable: true })
  FechaEnvio?: Date;

  @Column({ type: 'datetime', nullable: true })
  FechaSistema?: Date;

  @Column({ type: 'varchar', nullable: true })
  Estacion?: string;

  @Column({ type: 'varchar', nullable: true })
  Usuario?: string;

  @Column({ type: 'varchar', nullable: true })
  UrlGoogle?: string;

  @Column({ type: 'datetime', nullable: true })
  FechaAnula?: Date;

  @Column({ type: 'varchar', nullable: true })
  UsuarioAnula?: string;

  @Column({ type: 'varchar', nullable: true })
  NotaAnula?: string;

  @Column({ type: 'datetime', nullable: true })
  FechaAprueba?: Date;

  @Column({ type: 'varchar', nullable: true })
  UsuarioAprueba?: string;

  @Column({ type: 'varchar', nullable: true })
  NotaAprueba?: string;

  @Column({ type: 'float', nullable: true })
  Latitud?: number;

  @Column({ type: 'float', nullable: true })
  Longitud?: number;

  @Column({ type: 'varchar', nullable: true })
  UrlPhoto?: string;
}
