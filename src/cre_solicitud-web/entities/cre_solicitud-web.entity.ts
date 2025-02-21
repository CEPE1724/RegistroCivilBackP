
import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Cre_SolicitudWeb')
export class CreSolicitudWeb {

    @PrimaryGeneratedColumn()
    idCre_SolicitudWeb: number;

    @Column('datetime')
    Fecha: Date;

    @Column('varchar')
    
    NumeroSolicitud: string;

    @Column('int')
    Bodega: number;

    @Column('int')
    idVendedor: number;

    @Column('int')
    idCompraEncuesta: number;

    @Column('varchar')
    Cedula: string;

    @Column('varchar')
    CodDactilar: string;

    @Column('varchar')
    Apellidos: string;

    @Column('varchar')
    Nombres: string;

    @Column('varchar')
    Celular: string;

    @Column('varchar')
    Email: string;

    @Column('int')
    idActEconomina: number;

    @Column('int')
    idCre_Tiempo: number;

    @Column('bit')
    bAfiliado: boolean;

    @Column('bit')
    bTieneRuc: boolean;

    @Column('varchar')
    Foto: string;

    @Column('bit')
    bTerminosYCondiciones: boolean;

    @Column('bit')
    bPoliticas: boolean;

    @Column({ type: 'int', default: 1 })
    Estado: number;

    @Column('int')
    idProductos: number;

    @BeforeInsert()
    upperApellidos() {
        if (this.Apellidos) {
            this.Apellidos = this.Apellidos.toUpperCase();
        }
    }
    
    @BeforeInsert()
    upperNombres() {
        if (this.Nombres) {
            this.Nombres = this.Nombres.toUpperCase();
        }
    }
    

}
