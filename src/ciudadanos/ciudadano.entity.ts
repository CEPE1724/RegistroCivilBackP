import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CiudadanosRegCivil')
export class Ciudadano {
  @Column({ type: 'int' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  NUI: string;

  @Column({ type: 'varchar', length: 10 })
  CODIGODACTILAR: string;

  @Column({ type: 'varchar', length: 255 })
  NOMBRE: string;

  @Column({ type: 'varchar', length: 255 })
  APELLIDOS: string;

  @Column({ type: 'varchar', length: 255 })
  NOMBRES: string;

  @Column({ type: 'varchar', length: 255 })
  SEXO: string;

  @Column({ type: 'varchar', length: 255 })
  FECHANACIMIENTO: string;

  @Column({ type: 'varchar', length: 255 })
  FECHACEDULACION: string;

  @Column({ type: 'varchar', length: 255 })
  INSTRUCCION: string;

  @Column({ type: 'varchar', length: 255 })
  PROFESION: string;

  @Column({ type: 'varchar', length: 255 })
  NACIONALIDAD: string;

  @Column({ type: 'varchar', length: 255 })
  CONDICIONCEDULADO: string;

  @Column({ type: 'varchar', length: 255 })
  ESTADOCIVIL: string;

  @Column({ type: 'varchar', length: 255 })
  NOMBREPADRE: string;

  @Column({ type: 'varchar', length: 255 })
  NOMBREMADRE: string;

  @Column({ type: 'varchar', length: 'max' })
  FOTO: string; // Base64 image

  @Column({ type: 'varchar', length: 'max' })
  FIRMA: string; // Base64 image

  @Column({ type: 'varchar', length: 255 })
  DOMICILIO: string;

  @Column({ type: 'varchar', length: 255 })
  CALLE: string;

  @Column({ type: 'varchar', length: 255 })
  NUMEROCASA: string;

  @Column({ type: 'varchar', length: 255 })
  LUGARNACIMIENTO: string;

  @Column({ type: 'varchar', length: 255 })
  CONYUGE: string;

  @Column({ type: 'varchar', length: 255 })
  FECHAMATRIMONIO: string;

  @Column({ type: 'varchar', length: 255 })
  FECHAFALLECIMIENTO: string;

  @Column({ type: 'datetime2' })
  FECHACONSULTA: Date;
}
