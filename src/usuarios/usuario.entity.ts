import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Usuario')
export class Usuario {

  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Nombre: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Clave: string;

  @Column({ type: 'int', nullable: true })
  idGrupo: number;

  @Column({ type: 'int', nullable: true })
  Sexo: number;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Iniciales: string;

  @Column({ type: 'datetime', nullable: true })
  FechaIngreso: Date;

  @Column({ type: 'bit', nullable: true })
  Activo: boolean;

  @Column({ type: 'int', nullable: true })
  idDepartamento: number;

  @Column({ type: 'int', nullable: true })
  Nivel: number;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Usuario: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  DireccionIP: string;

  @Column({ type: 'bit', nullable: true })
  Recordatorios: boolean;
}
