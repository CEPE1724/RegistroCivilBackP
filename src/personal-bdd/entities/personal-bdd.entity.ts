import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/usuario.entity';

@Entity('PersonalBDD', { schema: 'dbo' })
export class PersonalBdd {
  @PrimaryGeneratedColumn('uuid', { name: 'IdPersonalBDD' })
  idPersonalBDD: string;

  @Column('varchar', { name: 'Codigo', length: 20, nullable: false, unique: true })
  codigo: string;

  @Column('varchar', { name: 'ApellidoPaterno', length: 150, nullable: true, default: '' })
  apellidoPaterno: string;

  @Column('varchar', { name: 'ApellidoMaterno', length: 150, nullable: true, default: '' })
  apellidoMaterno: string;

  @Column('varchar', { name: 'PrimerNombre', length: 150, nullable: true, default: '' })
  primerNombre: string;

  @Column('varchar', { name: 'SegundoNombre', length: 150, nullable: true, default: '' })
  segundoNombre: string;

  @Column('int', { name: 'Estado', nullable: true, default: 0, select: false })
  estado: number;

  @Column('datetime', { name: 'FechaSistema', nullable: true, default: () => 'GETDATE()' })
  fechaSistema: Date;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'Codigo', referencedColumnName: 'Nombre' })
  usuario: Usuario;
}