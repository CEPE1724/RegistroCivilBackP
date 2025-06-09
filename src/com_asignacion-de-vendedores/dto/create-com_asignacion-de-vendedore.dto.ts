
import { Col } from "sequelize/types/utils";
import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Com_AsignacionDeVendedores')
export class CreateComAsignacionDeVendedoreDto {
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

}




