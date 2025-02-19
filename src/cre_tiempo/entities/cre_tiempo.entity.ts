
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Cre_Tiempo') 
export class CreTiempo {

    @PrimaryGeneratedColumn('increment')
    idCre_Tiempo: number;

    @Column({ type: 'varchar', length: 60, nullable: true })
    Descripcion: string;

    @Column({ type: 'int', nullable: true })
    Activo: number;


    
}
