

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('ListaNegraCell')
export class ListaNegraCell {
  
    @PrimaryGeneratedColumn({ name: 'idListaNegraCell' })
    idListaNegraCell: number;
    
    @Column({ name: 'Telefono', type: 'varchar', length: 20 })
    Telefono: string;
    
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
