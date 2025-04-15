import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';  // Relacionamos con Usuario
import { Bodega } from './bodega.entity';    // Relacionamos con Bodega

@Entity('UsuariosBodegas')
export class UsuarioBodega {
  @PrimaryGeneratedColumn({ name: 'idUsuarioBodega' })
  idUsuarioBodega: number;

  @Column({ type: 'int', nullable: true })
  idUsuario: number;

  @Column({ type: 'int', nullable: true })
  bodega: number;

  @ManyToOne(() => Usuario, usuario => usuario.usuariosBodegas)
  usuario: Usuario;

  @ManyToOne(() => Bodega, bodega => bodega.usuariosBodegas)
  bodegaEntity: Bodega;
}
