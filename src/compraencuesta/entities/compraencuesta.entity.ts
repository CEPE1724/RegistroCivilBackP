import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity('CompraEncuesta')  // Explicitly setting the table name
export class Compraencuesta {

    @PrimaryGeneratedColumn('increment')
    idCompraEncuesta: number;

    @Column('text', {
        default: ''
    })
    Descripcion: string;

    @Column('int', {  // Change 'boolean' to 'int' for MSSQL compatibility
        default: 0
    })
    Estado: number;
}
