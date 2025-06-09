

import { Col } from "sequelize/types/utils";
import { BeforeInsert,  Entity, PrimaryColumn, PrimaryGeneratedColumn,Column, JoinColumn, ManyToMany , ManyToOne
} from "typeorm";
import { Nomina } from 'src/nomina/entities/nomina.entity';
import { DispositivosApp } from "src/dispositivos-app/entities/dispositivos-app.entity";
@Entity('Com_AsignacionDeVendedores')
export class ComAsignacionDeVendedore {
    @PrimaryGeneratedColumn({ name: 'idCom_AsignacionDeVendedores' })
    idComAsignacionDeVendedores: number;
    
    @Column({ type: 'varchar', length: 7, nullable: true })
    Periodo: string;
    
    @Column({ type: 'int', nullable: true })
    Bodega: number;
    
    @Column({ type: 'int', nullable: true })
    idCargo: number;
    
    @Column({ type: 'int', nullable: true })
    idPersonal: number;
    
    @Column({ type: 'int', nullable: true })
    idCom_Rango: number;
    
    @Column({ type: 'datetime', nullable: true })
    Desde: Date;
    
    @Column({ type: 'datetime', nullable: true })
    Hasta: Date;
    
    @Column({ type: 'int', nullable: true })
    NumeroDias: number;
    
    @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
    Diario: number;
    
    @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
    Mensual: number;
    
    @Column({ type: 'int', nullable: true })
    idCom_Estado: number;

    // Relaciones con otras entidades
    @ManyToOne(() => Nomina)
    @JoinColumn({ name: 'idPersonal', referencedColumnName: 'idPersonal' })
    nomina: Nomina;
    

    // Puedes agregar más relaciones aquí si es necesario
}





