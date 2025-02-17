import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity('Cre_VerificacionTelefonicaWeb')  // Explicitly setting the table name
export class Cre_VerificacionTelefonica {

    @PrimaryGeneratedColumn('increment')
    idCre_VerificacionTelefonicaWeb: number;
    
    @Column('text', {
        default: ''
    })
    Respuesta: string;
}
