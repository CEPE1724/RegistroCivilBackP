
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('AnalistaCredito')
export class Analistacredito {
    @PrimaryGeneratedColumn()
    idAnalistaCredito: number;
    
    @Column({ type: 'nvarchar', length: 200, nullable: true })
    Nombre: string;
    
    @Column({ type: 'int', nullable: true })
    idUsuario: number;
    
    @Column({ type: 'datetime', nullable: true })
    Fecha: Date;
    
    @Column({ type: 'int', nullable: true })
    Estado: number;
    
    }

