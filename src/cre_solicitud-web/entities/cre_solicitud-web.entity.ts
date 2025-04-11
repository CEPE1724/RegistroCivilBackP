
import { Col } from "sequelize/types/utils";
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
    idAnalista: number;


    @Column('int')
    idCompraEncuesta: number;

    @Column('varchar')
    Cedula: string;

    @Column('varchar')
    CodDactilar: string;

    @Column('varchar')
    ApellidoPaterno: string;

    @Column('varchar')
    ApellidoMaterno: string;

    @Column('varchar')
    PrimerNombre: string;

    @Column('varchar')
    SegundoNombre: string;

    @Column('varchar')
    Celular: string;

    @Column('varchar')
    Email: string;

    @Column('int')
    idActEconomina: number;

    @Column('int')
    idSituacionLaboral: number;

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

    @Column({type : 'int', default: 1})
    idCre_TiempoVivienda: number;

    @Column( {type: 'int', default: 1})
    idTipoCliente: number;

    @Column('int')
    idProductos: number;

	@Column('varchar')
	otp_code: string;

    @Column('varchar')
    Usuario: string;


    @Column('int')
    idEstadoVerificacionDocumental: number;

    @Column('int')
    idEstadoVerificacionSolicitud: number;

    @Column('int')
    idEstadoVerificacionTelefonica : number;
    
    @Column('int')
    idEstadoVerificacionTerrena: number;

    @Column('int')
    Resultado: number;

    @Column('decimal', { precision: 10, scale: 2 })
    Entrada: number;

    @Column('int')
    TerrenoDomicilio: number;

    @Column('int')
    TerrenoLaboral: number;

    @Column('int')
    idEstadoVerificacionDomicilio: number;
    

    @BeforeInsert()
    upperApellidos() {
        if (this.ApellidoMaterno) {
            this.ApellidoMaterno = this.ApellidoMaterno.toUpperCase();
        }
    }
    
    @BeforeInsert()
    upperNombres() {
        if (this.PrimerNombre) {
            this.PrimerNombre = this.PrimerNombre.toUpperCase();
        }
    }

    @BeforeInsert()
    upperSegundoNombre() {
        if (this.SegundoNombre) {
            this.SegundoNombre = this.SegundoNombre.toUpperCase();
        }
    }

    @BeforeInsert()
    uppperApellidoPaterno() {
        if (this.ApellidoPaterno) {
            this.ApellidoPaterno = this.ApellidoPaterno.toUpperCase();
        }
    }
    
    
}
