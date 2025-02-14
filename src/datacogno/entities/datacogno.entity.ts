
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert  } from "typeorm";

@Entity()
export class Datacogno {

    @PrimaryGeneratedColumn('increment')
    idDataCogno: number;
    
    @Column('text',{
        default: ''
    })
    Cedula: string;

    @Column('text',
        {
            default: ''
        }
    )
    Codigo : string;

    @Column('text',
        {
            default: ''
        }
    )
    Mensaje : string;

   
/* int y numeri*/
}
