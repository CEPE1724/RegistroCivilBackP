import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('ListaNegraEmail')
export class ListaNegraEmail {
  
    @PrimaryGeneratedColumn({ name: 'idListaNegraEmail' })
    idListaNegraEmail: number;
    
    @Column({ name: 'Email', type: 'varchar', length: 100 })
    Email: string;
    
    @Column({ name: 'Observacion', type: 'varchar', length: 255 })
    Observacion: string;
    
    @Column({ name: 'Activo', type: 'bit', default: true })
    Activo: boolean;
    
    @Column({ name: 'FechaSistema', type: 'datetime' })
    FechaSistema: Date;
    
    @Column({ name: 'Estacion', type: 'varchar', length: 50 })
    Estacion: string;
    
    @Column({ name: 'Usuario', type: 'varchar', length: 50 })
    Usuario: string;
 
}
