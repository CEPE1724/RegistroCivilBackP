import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsuarioBodega } from './usuario-bodega.entity';  // Relacionamos la tabla UsuariosBodegas


@Entity('Bodega')
export class Bodega {
  @PrimaryGeneratedColumn()
  IdBodega: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Nombre: string;

  @Column({ type: 'int', nullable: true })
  Bodega: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Usuario: string;

  @Column({ type: 'int', nullable: true })
  idTipoFactura: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Codigo: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  CentroCosto: string;

  @Column({ type: 'bit' })
  Activo: boolean;

  @Column({ type: 'int', nullable: true })
  idCiudad: number;

  @Column({ type: 'bit' })
  Sel: boolean;

  @Column({ type: 'int', nullable: true })
  idProyecto: number;

  @Column({ type: 'bit' })
  Transferencia: boolean;

  @Column({ type: 'bit', nullable: true })
  TransferenciaMultiple: boolean;

  @Column({ type: 'varchar', length: 120, nullable: true })
  Direccion: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  Serie: string;

  @Column({ type: 'bit', nullable: true })
  Factura: boolean;

  @Column({ type: 'varchar', length: 40, nullable: true })
  Autorizacion: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  Telefono: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  Email: string;

  @Column({ type: 'datetime', nullable: true })
  Caducidad: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  NumFactura: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  NumNotaCreditoFiscal: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  NumNotaCredito: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  NumAnticipo: string;

  @Column({ type: 'int', nullable: true })
  OrdenTM: number;

  @Column({ type: 'bit', nullable: true })
  Automatico: boolean;

  @Column({ type: 'varchar', length: 20, nullable: true })
  NumGuia: string;

  @Column({ type: 'bit', nullable: true })
  AutGuiaRemision: boolean;

  @Column({ type: 'varchar', length: 40, nullable: true })
  AutorGuiaRemision: string;

  @Column({ type: 'bit', nullable: true })
  Almacen: boolean;

  @Column({ type: 'bit', nullable: true })
  Tamaño: boolean;  // Cambiado a "Tamaño"

  @Column({ type: 'int', nullable: true })
  idTipoDeAlmacen: number;

  @Column({ type: 'bit', nullable: true })
  Inventario: boolean;

  @Column({ type: 'bit', nullable: true })
  FS: boolean;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  DirectorioPrecios: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  DirectorioPCM: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  DirectorioPCP: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  DirectorioPC: string;

  @Column({ type: 'bit', nullable: true })
  Caja: boolean;

  @Column({ type: 'bit', nullable: true })
  Compra: boolean;

  @Column({ type: 'bit', nullable: true })
  PRC: boolean;

  @Column({ type: 'bit', nullable: true })
  NCP: boolean;

  @Column({ type: 'bit', nullable: true })
  Promociones: boolean;

  @Column({ type: 'bit', nullable: true })
  ImprimePrecios: boolean;

  @Column({ type: 'bit', nullable: true })
  DT: boolean;

  @Column({ type: 'bit', nullable: true })
  Principal: boolean;

  @Column({ type: 'bit', nullable: true })
  PTC: boolean;

  @Column({ type: 'varchar', length: 2, nullable: true })
  CodProvinciaTelf: string;

  @Column({ type: 'int', nullable: true })
  idSector: number;

  @Column({ type: 'bit', nullable: true })
  Compras: boolean;

  @Column({ type: 'bit', nullable: true })
  Spiff: boolean;

  @Column({ type: 'bit', nullable: true })
  Credito: boolean;

  @Column({ type: 'int', nullable: true })
  Metros: number;

  @Column({ type: 'int', nullable: true })
  idUbicacion: number;

  @Column({ type: 'int', nullable: true })
  idSocioEconomica: number;

  @Column({ type: 'int', nullable: true })
  Jefe: number;

  @Column({ type: 'int', nullable: true })
  Subencargado: number;

  @Column({ type: 'int', nullable: true })
  Cajera: number;

  @Column({ type: 'int', nullable: true })
  Senior: number;

  @Column({ type: 'int', nullable: true })
  Junior: number;

  @Column({ type: 'int', nullable: true })
  Vigilante: number;

  @Column({ type: 'int', nullable: true })
  TotalVendedores: number;

  @Column({ type: 'int', nullable: true })
  TotalPersonal: number;

  @Column({ type: 'datetime', nullable: true })
  FechaApertura: Date;

  @Column({ type: 'datetime', nullable: true })
  FechaCierre: Date;

  @Column({ type: 'bit', nullable: true })
  PromocionesCombos: boolean;

  @Column({ type: 'bit', nullable: true })
  CCF: boolean;

  @Column({ type: 'bit', nullable: true })
  TransfEntreLocales: boolean;

  @Column({ type: 'bit', nullable: true })
  ValidaTipoVenta: boolean;

  @Column({ type: 'bit', nullable: true })
  Carpa: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  Equipo: string;

  @Column({ type: 'bit', nullable: true })
  Remates: boolean;

  @Column({ type: 'bit', nullable: true })
  Val_Deposito: boolean;

  @Column({ type: 'bit', nullable: true })
  Puerteo: boolean;

  @Column({ type: 'bit', nullable: true })
  FDPBodega: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  DirPrecRemGrande: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  DirPrecRemMediano: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  DirPrecRemPequeño: string;

  @Column({ type: 'int', nullable: true })
  Ubicacion: number;

  @Column({ type: 'int', nullable: true })
  Region: number;

  @Column({ type: 'bit', nullable: true })
  RecibeConsignacion: boolean;

  @Column({ type: 'bit', nullable: true })
  Consignacion: boolean;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  PorcentajeCajero: number;

  @Column({ type: 'int', nullable: true })
  OrdActu: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  dCostoPuerteo: number;

  @Column({ type: 'bit', nullable: true })
  ComisionCobranza: boolean;

  @Column({ type: 'bit', nullable: true })
  CrediPoint: boolean;

  @Column({ type: 'int', nullable: true })
  OrigenTM: number;

  @Column({ type: 'int', nullable: true })
  idBodegaPayJoy: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  ClavePayJoy: string;

  @Column({ type: 'bit', nullable: true })
  Estado: boolean;

  @Column({ type: 'int', nullable: true })
  bodega_ora: number;

  @Column({ type: 'int', nullable: true })
  iGrupo: number;

  @Column({ type: 'bit', nullable: true })
  PointMovil: boolean;

  @Column({ type: 'float', nullable: true })
  Latitud: number;

  @Column({ type: 'float', nullable: true })
  Longitud: number;

  @Column({ type: 'int', nullable: true })
  iNuovo: number;

  @Column({ type: 'int', nullable: true })
  NumTrans: number;

  @Column({ type: 'bit', nullable: true })
  SolicitudCredito: boolean;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  Ancho: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  Largo: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  TotalLongitud: number;

  @Column({ type: 'bit', nullable: true })
  BufferB: boolean;

  @Column({ type: 'int', nullable: true })
  idProvincia: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  Cuota_Cero: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  Flujo: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  Ratio: number;


  @OneToMany(() => UsuarioBodega, usuarioBodega => usuarioBodega.bodega)
  usuariosBodegas: UsuarioBodega[];
}
