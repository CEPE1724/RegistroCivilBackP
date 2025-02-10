import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Bodega') // Nombre de la tabla en la base de datos
export class Bodega {
    @PrimaryGeneratedColumn()
    idBodega: number;
    
    @Column({ length: 100, nullable: true })
    Nombre: string;
    
    @Column()
    Bodega : number;

    @Column()
    Activo: number;

    @Column()
    Remates: number;

}